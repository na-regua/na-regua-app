import {ACCESS_TOKEN_KEY} from '@/store/slicers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError} from 'axios';

export const API_ORIGIN = 'http://192.168.0.4:8080/';

export function errToAxiosError(err: any): AxiosError {
  const {message, code, config, request, response} = err;

  return new AxiosError(message, code, config, request, response);
}

const api = axios.create({
  baseURL: `${API_ORIGIN}api`,
});

api.interceptors.request.use(async config => {
  if (config.withCredentials) {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
