import { useAuth } from "@/providers/AuthProvider";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const { isAuthenticated, user } = useAuth();
  console.log({ isAuthenticated, user });

  return (
    <View className="flex-1 justify-center items-center gap-4">
      <Link href="/camera" className="text-2xl text-white">
        Open Camera
      </Link>
      <Link href="/event" className="text-2xl text-white">
        Open Event
      </Link>
    </View>
  );
}
