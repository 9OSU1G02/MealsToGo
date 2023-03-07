import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";

export const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [sum, setSum] = useState(0);
  const saveCart = async (rst, crt, uid) => {
    try {
      const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (e) {
      console.log("error saving cart", e);
    }
  };
  const loadCart = async (uid) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@cart-${uid}`);
      if (jsonValue != null) {
        const { restaurant: rst, cart: crt } = JSON.parse(jsonValue);
        setRestaurant(rst);
        setCart(crt);
      }
    } catch (e) {
      console.log("error loading cart", e);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      saveCart(restaurant, cart, user.uid);
    }
  }, [cart, restaurant, user]);

  useEffect(() => {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price;
    });
    setSum(sum);
  }, [cart]);
  const add = (item, rst) => {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };

  const clear = () => {
    setCart([]);
    setRestaurant(null);
  };
  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        restaurant,
        cart,
        clearCart: clear,
        sum,
        setSum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
