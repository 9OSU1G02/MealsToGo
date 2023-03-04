import { CompactRestaurantInfo } from "../../../components/restaurant/compact.restaurant.info.component";

export const MapCallout = ({ restaurant }) => {
  return <CompactRestaurantInfo isMap={true} restaurant={restaurant} />;
};
