import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { FavoritesScreen } from "../../features/settings/screens/favorites.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({route, navigation}) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
      }}
    >
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <SettingsStack.Screen name="FavoritesScreen" component={FavoritesScreen} />
    </SettingsStack.Navigator>
  );
}
