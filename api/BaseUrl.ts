import axios from 'axios'

export const BaseUrl = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type':'application/json'
    }
})