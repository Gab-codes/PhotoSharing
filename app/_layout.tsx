import AuthProvider from "@/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import "../global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: "Events",
                headerLargeTitle: true,
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name="events/[id]/index"
              options={{
                title: "Event",
                headerLargeTitle: true,
                headerBackButtonDisplayMode: "minimal",
              }}
            />
            <Stack.Screen
              name="events/[id]/camera"
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
      </QueryClientProvider>
    </ThemeProvider>
  );
}
