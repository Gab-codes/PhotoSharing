import EventListItem from "@/components/event-list-item";
import { getEvents } from "@/services/events";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function Index() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={data}
      contentContainerClassName="gap-4 p-4"
      renderItem={({ item }) => <EventListItem event={item} />}
      contentInsetAdjustmentBehavior={"automatic"}
    />
  );
}
