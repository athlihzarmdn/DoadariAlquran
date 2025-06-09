import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { Platform } from "react-native";
import { interstitialAdService } from "./services/InterstitialAdService";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    // Only initialize tempo-devtools in development and on web platform
    if (__DEV__ && Platform.OS === "web") {
      try {
        // Dynamic import to prevent bundling issues
        const tempoDevtools = require("tempo-devtools");
        if (
          tempoDevtools?.TempoDevtools?.init &&
          typeof tempoDevtools.TempoDevtools.init === "function"
        ) {
          tempoDevtools.TempoDevtools.init();
        }
      } catch (error) {
        // Silently ignore tempo-devtools errors
        console.warn("tempo-devtools initialization failed:", error);
      }
    }

    // Initialize interstitial ad service on Android
    if (Platform.OS === "android") {
      interstitialAdService.preloadAd();
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={({ route }) => ({
          headerShown: !route.name.startsWith("tempobook"),
        })}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
