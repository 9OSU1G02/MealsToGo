import styled from "styled-components/native";
import {
  Avatar,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
export const CartIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const CartIcon = styled(Avatar.Icon).attrs({
  size: 128,
})`
  background-color: ${(props) => props.bg || props.theme.colors.brand.primary};
`;

export const NameInput = styled(TextInput)`
  margin: ${(props) => props.theme.space[3]};
`;

export const PayButton = styled(Button).attrs({
  buttonColor: colors.brand.primary,
})`
  width: ${windowWidth * 0.8}px;
  align-self: center;
  padding: ${(props) => props.theme.space[2]};
`;
export const ClearButton = styled(Button).attrs({
  buttonColor: colors.ui.error,
})`
  width: ${windowWidth * 0.8}px;
  align-self: center;
  padding: ${(props) => props.theme.space[2]};
`;

export const PaymentProcessing = styled(ActivityIndicator).attrs({
  animating: true,
  color: "black",
  size: "large",
})`
  position: absolute;
  top: 50%;
  align-self: center;
  z-index: 999;
`;
