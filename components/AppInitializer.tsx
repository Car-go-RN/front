import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/slices/userSlices';
import { useRouter } from "expo-router";

const AppInitializer = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      const userString = await SecureStore.getItemAsync('user');

      if (token && userString) {
        try {
          const user = JSON.parse(userString);
          dispatch(loginSuccess({ token, user }))
          router.replace('/');
        } catch (err) {
        }
      }
    };
    init();
  }, []);

  return null;
}

export default AppInitializer;