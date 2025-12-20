import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Link href="/camera" className="text-2xl text-white">
        Open Camera
      </Link>
    </View>
  );
}
