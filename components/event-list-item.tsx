import { Tables } from "@/types/database.types";
import { Text, View } from "react-native";

type Event = Tables<"events">;

type EventListItemProps = {
  event: Event;
};

const EventListItem = ({ event }: EventListItemProps) => {
  return (
    <View className="bg-neutral-800 p-4 rounded-lg">
      <Text className="text-2xl text-white font-bold">{event.name}</Text>
    </View>
  );
};

export default EventListItem;
