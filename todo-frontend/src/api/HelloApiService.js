import { apiClient } from './ApiClient';

export function retrieveHello() {
  return apiClient.get('http://localhost:8080/hello');
}

export const retrieveHelloBean = () => apiClient.get('/hello-bean');

export const retrieveHelloPathVariable = (username, token) => {
  if (!token) {
    return apiClient.get(`/hello/path-variable/${username}`);
  }

  return apiClient.get(`/hello/path-variable/${username}`, {
    headers: {
      Authorization: token,
    },
  });
};
