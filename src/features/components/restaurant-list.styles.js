import { FlatList } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components";
import { colors } from "../../infrastructure/theme/colors";
export const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const OrderButton = styled(Button).attrs({
  buttonColor: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 100%;
  align-self: center;
`;
