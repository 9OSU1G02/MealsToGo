import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { CheckoutSuccessScreen } from "../../features/checkout/screens/checkout-success.screen";
import { CheckoutErrorScreen } from "../../features/checkout/screens/checkout-error.screen";
const CheckoutStack = createStackNavigator();

export const CheckoutNavigator = () => {
  return (
    <CheckoutStack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}
    >
      <CheckoutStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <CheckoutStack.Screen
        name="CheckoutSuccessScreen"
        component={CheckoutSuccessScreen}
      />
      <CheckoutStack.Screen
        name="CheckoutErrorScreen"
        component={CheckoutErrorScreen}
      />
    </CheckoutStack.Navigator>
  );
};
