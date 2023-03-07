import createStripe from "stripe-client";
const stripe = createStripe(
  "pk_test_51McUqGGWsUQEn4XPt77m7k0BvMEfL5FKQ0cR9mJQsYaHD1wzEMPwyyED97asokkAC7aJNkG5EvxWRmgDB4fo8yaH00NZsYZnNE"
);

export const cardTokenRequest = (card) => {
  return stripe.createToken({ card });
};

export const payRequest = (token, amount, name) => {
  return fetch(`http://127.0.0.1:5001/m3ssag3r-8c5fa/us-central1/pay`, {
    body: JSON.stringify({
      token,
      amount,
      name,
    }),
    method: "POST",
  }).then((response) => {
    if (response.status > 200) {
      return Promise.reject("Payment failed");
    }
    return response.json();
  })
  .catch((error) => {
    console.log("Payment failed front end", error);
  });
};
