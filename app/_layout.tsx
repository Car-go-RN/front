import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Stack } from 'expo-router';
// import AppInitializer from '@/components/AppInitializer';
import { Provider } from 'react-redux'
import { store } from './store/store';
import { loginSuccess } from './store/slices/userSlices';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Paperlogy: require('../assets/fonts/Paperlogy-4Regular.ttf'),
  });

  const [ready, setReady] = useState(false);

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  // useEffect(() => {
  //   const prepare = async () => {
  //     if (loaded) {
  //       const token = await SecureStore.getItemAsync("accessToken");
  //       if (token) {
  //         store.dispatch(loginSuccess({ token, user: { email: "unknown"}}));
  //       }
  //       setReady(true);
  //       await SplashScreen.hideAsync();
  //     }
  //   };
  //   prepare()
  // }, [loaded]);

  if (!ready) return null;

  return (
    <Provider store={store}>
      {/* <AppInitializer /> */}
      <Stack
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/Login" />
        <Stack.Screen name="auth/Signup" />
        <Stack.Screen name="Main" />
        <Stack.Screen name="search/RouteQuest" />
        <Stack.Screen name="profile/MyPage" />
        <Stack.Screen name="profile/LookBookMark" />
        <Stack.Screen name="profile/EmailUpdate" />
        <Stack.Screen name="profile/PasswordUpdate" />
        <Stack.Screen name="Survey" />
        <Stack.Screen name="RestArea" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  );
}
