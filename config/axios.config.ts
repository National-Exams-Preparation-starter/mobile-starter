import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { type AxiosInstance } from "axios";

const API_URL = "https://67ac71475853dfff53dab929.mockapi.io/api/v1"

const commonHeaders = {
    'Content-Type': 'application/json',
};



export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: commonHeaders,
});

const authorizedAxiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        ...commonHeaders,
        Authorization: `Bearer ${AsyncStorage.getItem('access_token')}`
    },
});

authorizedAxiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authorizedAPI = authorizedAxiosInstance;