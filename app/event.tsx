import { cloudinaryImageUrl } from "@/lib/cloudinary";
import { Image, View } from "react-native";

const Event = () => {
  const imageUrl = cloudinaryImageUrl("myvvjy1cmdwjc9bsvkqo", {
    width: 600,
    height: 500,
  });

  return (
    <View className="bg-red-500 h-screen">
      <Image
        source={{ uri: imageUrl }}
        className="w-full aspect-[3/4]"
        resizeMode="cover"
      />
    </View>
  );
};

export default Event;
