import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const instance = axios.create({
    baseURL: "https://fairylike-harlee-unsurvived.ngrok-free.dev",
    timeout: 4000,
    headers: {
        "Content-type": "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});
instance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);