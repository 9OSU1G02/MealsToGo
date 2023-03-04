import { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const FadeInView = ({ duration = 1500, ...props }) => {
  const fadeAnimReft = useRef(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(fadeAnimReft.current, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [duration]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnimReft.current, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};
