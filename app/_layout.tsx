import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Paperlogy: require('../assets/fonts/Paperlogy-4Regular.ttf'),
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
    <>
      <Stack
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" />
        <Stack.Screen name="Main" />
        <Stack.Screen name="Survey" />
        <Stack.Screen name="auth/Login" />
        <Stack.Screen name="auth/Signup" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
