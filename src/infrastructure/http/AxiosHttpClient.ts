import axios from 'axios';
import type { AxiosInstance } from 'axios';

export class AxiosHttpClient {
  private static instance: AxiosInstance;

  public static getInstance(): AxiosInstance {
    if (!AxiosHttpClient.instance) {
      AxiosHttpClient.instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
        timeout: 10000,
      });

      // Interceptor para incluir o token de autenticação
      AxiosHttpClient.instance.interceptors.request.use(
        config => {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        error => Promise.reject(error)
      );
    }

    return AxiosHttpClient.instance;
  }
}
