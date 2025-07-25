import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError} from 'axios';
import {onUnauthorizedResponse} from './interceptors';
import {ACCESS_TOKEN_KEY} from '../models';
import {emitErrorNotification} from './emitErrorNotification';

export let API_ORIGIN = 'https://na-regua-api.onrender.com/';
API_ORIGIN = 'http://localhost:8080/';
API_ORIGIN = 'http://192.168.0.5:8080/';
// API_ORIGIN = 'http://192.168.1.23:8080/';

export function errToAxiosError(err: any): AxiosError {
  const {message, code, config, request, response} = err;

  return new AxiosError(message, code, config, request, response);
}

const api = axios.create({
  baseURL: `${API_ORIGIN}api`,
});

api.interceptors.request.use(async config => {
  if (config.withCredentials) {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY.toString());

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(undefined, onUnauthorizedResponse);
api.interceptors.response.use(undefined, error => {
  if (error instanceof AxiosError) {
    emitErrorNotification(error);
  }
});

export default api;
