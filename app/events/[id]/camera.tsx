import { uploadToCloudinary } from "@/lib/cloudinary";
import { useAuth } from "@/providers/AuthProvider";
import { insertAsset } from "@/services/assets";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const insertAssetMutation = useMutation({
    mutationFn: (assetId: string) =>
      insertAsset({ event_id: id, user_id: user?.id, asset_id: assetId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events", id],
      });
    },
  });

  const camera = useRef<CameraView>(null);

  if (!permission) {
    return <ActivityIndicator />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePhoto() {
    const photo = await camera.current?.takePictureAsync();
    if (!photo?.uri) return;
    const cloudinaryResponse = await uploadToCloudinary(photo.uri);
    console.log(cloudinaryResponse);

    // save photo to database asset table
    insertAssetMutation.mutate(cloudinaryResponse.public_id);
  }

  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} facing={facing}>
        <View className="absolute bottom-0 bg-neutral-900/20 p-4 w-full">
          <Ionicons
            name="camera-reverse"
            size={24}
            color="white"
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>

      {/* footer  */}
      <SafeAreaView
        edges={["bottom"]}
        className="flex-row bg-transparent w-full p-4 justify-center items-center"
      >
        <Pressable
          onPress={takePhoto}
          className="bg-white rounded-full size-20"
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    color: "white",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    backgroundColor: "red",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
