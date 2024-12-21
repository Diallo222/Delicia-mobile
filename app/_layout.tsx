import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import store from "@/store";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native";
import { Colors } from "@/constants";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Anton: require("../assets/fonts/Anton-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar
        translucent={false}
        style="dark"
        backgroundColor={Colors.amber100}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.amber100, paddingTop: 10 },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="mealDetail" />
          <Stack.Screen name="search" />
          <Stack.Screen name="byCategory" />
        </Stack>
      </SafeAreaView>
    </Provider>
  );
}
