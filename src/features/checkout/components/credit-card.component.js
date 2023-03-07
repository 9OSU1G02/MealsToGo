import { LiteCreditCardInput } from "react-native-credit-card-input-plus";
import { cardTokenRequest } from "../../../services/checkout/checkout.service";
export const CreditCardInput = ({ name, onSuccess, onError }) => {
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isInComplete = Object.values(status).includes("incomplete");
    const card = {
      number: values.number,
      exp_month: values.expiry.split("/")[0],
      exp_year: values.expiry.split("/")[1],
      cvc: values.cvc,
      name: name,
    };
    if (!isInComplete) {
      try {
        const info = await cardTokenRequest(card);
        onSuccess(info);
      } catch (error) {
        onError()
      }
    }
  };
  return <LiteCreditCardInput onChange={onChange} />;
};
