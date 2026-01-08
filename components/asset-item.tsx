import { cloudinaryImageUrl } from "@/lib/cloudinary";
import { Tables } from "@/types/database.types";
import { Image } from "expo-image";
import { View, useWindowDimensions } from "react-native";

const AssetItem = ({ asset }: { asset: Tables<"assets"> }) => {
  const { width } = useWindowDimensions();

  // 👇 real column width
  const itemWidth = (width - 15) / 2;

  const imageUrl = cloudinaryImageUrl(asset.asset_id!, {
    width: Math.round(itemWidth),
    height: Math.round((width * (4 / 3)) / 2),
  });

  return (
    <View style={{ width: itemWidth }} className="rounded-lg overflow-hidden">
      <Image
        source={{ uri: imageUrl }}
        style={{ aspectRatio: 3 / 4 }}
        className="flex-1 w-full"
      />
    </View>
  );
};

export default AssetItem;
