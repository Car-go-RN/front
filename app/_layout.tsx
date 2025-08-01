import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux'
import { store } from '../store/store';
import AppInitializer from '@/components/AppInitializer';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Paperlogy: require('../assets/fonts/Paperlogy-4Regular.ttf'),
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
      if (loaded) {
        SplashScreen.hideAsync();
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppInitializer />
      <Stack
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/Login" />
        <Stack.Screen name="auth/Signup" />
        <Stack.Screen name="search/routeQuest" />
        <Stack.Screen name="profile/MyPage" />
        <Stack.Screen name="profile/LookBookMark" />
        <Stack.Screen name="profile/PasswordUpdate" />
        <Stack.Screen name="Survey" />
        <Stack.Screen name="RestArea" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  );
}
