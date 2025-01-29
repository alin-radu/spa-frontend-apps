import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const setApiClientAuthorizationHeader = (token) =>
  apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = token;

    return config;
  });
