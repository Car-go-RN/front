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

      console.log("accessToken:", token);
      console.log("userString:", userString);

      if (token && userString) {
        try {
          const user = JSON.parse(userString);
          dispatch(loginSuccess({ token, user }))
          console.log("자동로그인성공", user);
          router.replace('/');
        } catch (err) {
          console.log("유저정보 불러오기 실패", err)
        }
      } else {
        console.log("토큰 또는 유저 정보 없음")
      }
    };
    init();
  }, []);

  return null;
}

export default AppInitializer;