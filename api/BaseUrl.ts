import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// 토큰 없는 요청용 (로그인, 회원가입 등)
export const PublicAxios = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type':'application/json'
    }
})

// 토큰 자동으로 붙는 요청용 (로그인 이후)
export const PrivateAxios = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

PrivateAxios.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})