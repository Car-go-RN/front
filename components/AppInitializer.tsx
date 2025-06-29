import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/app/store/slices/userSlices';
import { useRouter } from "expo-router";

const AppInitializer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        dispatch(loginSuccess({ token, user: {email: 'unknown'}}));
        router.replace('/');
      }
      setLoading(false)
    };
    init();
  }, []);

  if (loading) return null;
  return null;
}

export default AppInitializer;