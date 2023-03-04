import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import { useState } from "react/cjs/react.development";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.components";
import styled from "styled-components";

const ListAccordion = styled(List.Accordion)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  padding: 16px;
`;

export const RestaurantDetailScreen = ({ route }) => {
  const { restaurant } = route.params;
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.Section title="Accordions">
          <ListAccordion
            title="Breakfast"
            left={(props) => <List.Icon {...props} icon="bread-slice" />}
            expanded={breakfastExpanded}
            onPress={() => setBreakfastExpanded(!breakfastExpanded)}
          >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </ListAccordion>
          <ListAccordion
            title="Lunch"
            left={(props) => <List.Icon {...props} icon="bread-slice" />}
            expanded={lunchExpanded}
            onPress={() => setLunchExpanded(!lunchExpanded)}
          >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </ListAccordion>
          <ListAccordion
            title="Dinner"
            left={(props) => <List.Icon {...props} icon="bread-slice" />}
            expanded={dinnerExpanded}
            onPress={() => setDinnerExpanded(!dinnerExpanded)}
          >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </ListAccordion>
          <ListAccordion
            title="Drinks"
            left={(props) => <List.Icon {...props} icon="bread-slice" />}
            expanded={drinksExpanded}
            onPress={() => setDrinksExpanded(!drinksExpanded)}
          >
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </ListAccordion>
        </List.Section>
      </ScrollView>
    </SafeArea>
  );
};
