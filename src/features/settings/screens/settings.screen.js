import { useCallback, useContext, useState } from "react";
import { List, Avatar } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../restaurants/components/spacer/spacer.component";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import { colors } from "../../../infrastructure/theme/colors";
const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

const SettingsBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;


export const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState(null);
  console.log("SettingsScreen");
  const getProfilePicture = async (user) => {
    console.log("getProfilePicture");
    const photoUri = await AsyncStorage.getItem(`${user.uid}-photo`);
    setPhoto(photoUri);
  };

    useFocusEffect(
      useCallback(() => {
        getProfilePicture(user);
      }, [])
    );
  return (
    
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
          {photo && <Avatar.Image size={180} source={{ uri: photo }} />}
          {!photo && (
            <Avatar.Icon size={180} icon="human" backgroundColor={colors.brand.primary} />
          )}
        </TouchableOpacity>
        <Spacer size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favorites"
          description="View your favorites"
          left={(props) => <List.Icon {...props} color={colors.brand.secondary} icon="heart" />}
          onPress={() => navigation.navigate("FavoritesScreen")}
        />
        <SettingsItem
          title="Logout"
          left={(props) => (
            <List.Icon {...props} color="black" icon="credit-card" />
          )}
          onPress={() => onLogout()}
        />
      </List.Section>
    </SafeArea>
  );
};
