import AuthProvider from "@/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Events", headerLargeTitle: true }}
          />
          <Stack.Screen
            name="camera"
            options={{
              title: "Camera",
              headerBackButtonDisplayMode: "minimal",
              headerTransparent: true,
              headerBlurEffect: "dark",
              headerRight: () => (
                <Link href="/" asChild>
                  <Ionicons name="share-outline" size={24} color="white" />
                </Link>
              ),
            }}
          />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
