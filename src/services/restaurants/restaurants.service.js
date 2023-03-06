import { mockImages, mocks } from "./mock";
import camelize from "camelize";
export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
  return fetch(
    `http://127.0.0.1:5001/m3ssag3r-8c5fa/us-central1/placesNearby?location=${location}`
  )
    .then((res) => {
      console.log("restaurantsRequest Success");
      return res.json();
    })
    .catch((err) => {
      console.log("restaurantsRequest Fail", err);
      return mocks[location];
    });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    restaurant.photos = restaurant.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
