import { ActivityIndicator } from "react-native-paper";
import styled from "styled-components";
import { RestaurantInfoCard } from "../components/restaurant-info-card.components";
import { Spacer } from "../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import React, { useContext, useState } from "react";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { Search } from "../components/search.component";
import { TouchableOpacity } from "react-native";
import { FavoritesBar } from "../../../components/favorites/favorites.bar.component";
import { FavoritesContext } from "../../../services/favorites/favorites.context";
import { RestaurantList } from "../../components/restaurant-list.styles";
import { FadeInView } from "../../../components/animations/fade.animation";
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, error, restaurants } = useContext(RestaurantsContext);
  const [isToggled, setIsToggled] = useState(false);
  const { favorites } = useContext(FavoritesContext);
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color="black" />
        </LoadingContainer>
      )}
      <Search
        isFavoritesToggle={isToggled}
        onFavoritesToggle={() => setIsToggled(!isToggled)}
      ></Search>
      {isToggled && (
        <FavoritesBar favorites={favorites} onNavigate={navigation.navigate} />
      )}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", { restaurant: item })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
