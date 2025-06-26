import axios from "axios"

export const PHPUrl = axios.create({
    baseURL: process.env.EXPO_PUBLIC_PHP_URL,
    timeout: 5000,
    headers: {
        'Content-Type':'application/json'
    }
})