import AssetItem from "@/components/asset-item";
import { getEvent } from "@/services/events";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

const EventDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: event,
    isLoading,
    error,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["events", id],
    queryFn: () => getEvent(id),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text className="text-white">Error: {error.message}</Text>;
  }
  if (!event) {
    return <Text className="text-white">Event not found</Text>;
  }

  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: event.name || "Event" }} />

      <FlatList
        data={event.assets}
        numColumns={2}
        contentContainerClassName="gap-1 p-2"
        columnWrapperClassName="gap-1"
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({ item }) => <AssetItem asset={item} />}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
      <Link href={`/events/${id}/camera`} asChild>
        <Pressable className="absolute bottom-14 right-5 p-4 rounded-full bg-white flex-row items-center justify-center">
          <Ionicons name="camera-outline" size={40} />
        </Pressable>
      </Link>
    </View>
  );
};

export default EventDetails;
