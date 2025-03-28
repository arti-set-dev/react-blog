import axios from 'axios';
import {
  USER_LOCALSTORAGE_KEY,
  LOCAL_STORAGE_THEME_KEY,
} from '@/shared/const/localstorage';

export const $api = axios.create({
  withCredentials: true,
  baseURL: __API__,
  headers: {
    authorization: localStorage.getItem(LOCAL_STORAGE_THEME_KEY) || '',
  },
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
  }

  return config;
});
