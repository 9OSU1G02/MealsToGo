import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CartContext } from "../../../services/cart/cart.context";
import { Spacer } from "../../restaurants/components/spacer/spacer.component";
import {
  CartIcon,
  CartIconContainer,
  ClearButton,
  NameInput,
  PayButton,
  PaymentProcessing,
} from "../components/checkout.styles";
import { CreditCardInput } from "../components/credit-card.component";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.components";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Divider, List } from "react-native-paper";
import { View } from "react-native";
import { payRequest } from "../../../services/checkout/checkout.service";
export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, sum, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPay = () => {
    setIsLoading(true);
    if (!card || !card.id) {
      navigation.navigate("CheckoutErrorScreen", {
        error: "Please enter a valid card",
      });
      setIsLoading(false);
      return;
    }
    payRequest(card.id, sum, name)
      .then((result) => {
        setIsLoading(false);
        clearCart();
        navigation.navigate("CheckoutSuccessScreen");
      })
      .catch((error) => {
        navigation.navigate("CheckoutErrorScreen", {
          error: error.message,
        });
        setIsLoading(false);
      });
  };
  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text> Your cart is empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      {isLoading && <PaymentProcessing />}
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {cart.map(({ item, price }, i) => {
              return (
                <List.Item
                  title={`${item} - ${price / 100}`}
                  key={`item-${i}`}
                />
              );
            })}
          </List.Section>
          <Text>Total: {sum / 100}</Text>
        </Spacer>
        <Spacer position="top" size="large" />
        <Divider />
        <NameInput
          label="Name"
          value={name}
          onChangeText={(t) => {
            setName(t);
          }}
        />
        <Spacer position="top" size="large">
          {name.length > 0 && (
            <CreditCardInput
              name={name}
              onSuccess={setCard}
              onError={() => {
                navigation.navigate("CheckoutErrorScreen", {
                  error: "Some thing went wrong with your card",
                });
              }}
            />
          )}
        </Spacer>
        <Spacer position="top" size="xxl" />
        <PayButton
          disable={isLoading}
          icon="cash"
          mode="contained"
          onPress={onPay}
        >
          Pay
        </PayButton>
        <Spacer position="top" size="large">
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <ClearButton
              disable={isLoading}
              icon="cart-off"
              mode="contained"
              onPress={clearCart}
            >
              Clear Cart
            </ClearButton>
          </View>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
