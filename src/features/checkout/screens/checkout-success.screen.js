import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CartIcon, CartIconContainer } from "../components/checkout.styles";

export const CheckoutSuccessScreen = () => {
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="cart-check" />
        <Text variant="label"> Your order has been successfully placed!</Text>
      </CartIconContainer>
    </SafeArea>
  );
};
