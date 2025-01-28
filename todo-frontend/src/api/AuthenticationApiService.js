import { apiClient } from './ApiClient';

export const executeBasicAuthService = (token) =>
  apiClient.get(`/basic-auth`, {
    headers: {
      Authorization: token,
    },
  });

export const executeJwtAuthService = (username, password) =>
  apiClient.post(`/authenticate`, { username, password });
