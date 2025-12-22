import { Tables } from "@/types/database.types";
import { Link } from "expo-router";
import { Pressable, Text } from "react-native";

type Event = Tables<"events">;

type EventListItemProps = {
  event: Event;
};

const EventListItem = ({ event }: EventListItemProps) => {
  return (
    <Link href={`/events/${event.id}`} asChild>
      <Pressable className="bg-neutral-800 p-4 rounded-lg">
        <Text className="text-2xl text-white font-bold">{event.name}</Text>
      </Pressable>
    </Link>
  );
};

export default EventListItem;
