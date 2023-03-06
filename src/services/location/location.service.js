import camelize from "camelize";
import { locations } from "./location.mock";

export const locationRequest = (searchTerm) => {
  return fetch(
    `http://127.0.0.1:5001/m3ssag3r-8c5fa/us-central1/geocode?city=${searchTerm}`
  ).then((res) => {
    console.log("locationRequest Success");
    return res.json();
  })
  .catch((err) => {
    console.log("locationRequest Fail", err);
    return locations[searchTerm]
  })
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  const viewport = geometry.viewport;
  return { lat, lng, viewport };
};
