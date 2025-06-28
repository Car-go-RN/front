import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/app/store/slices/userSlices';

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        dispatch(loginSuccess({ token, user: {email: 'unknown'}}));
      }
    };
    init();
  }, []);

  return null;
}

export default AppInitializer;