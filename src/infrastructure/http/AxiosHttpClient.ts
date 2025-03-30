import axios from 'axios';
import type { AxiosError, AxiosInstance } from 'axios';

// Interface para a resposta de erro da API
interface ApiErrorResponse {
  error?: string;
  message?: string;
  [key: string]: any;
}

export class AxiosHttpClient {
  private static instance: AxiosInstance;

  public static getInstance(): AxiosInstance {
    if (!AxiosHttpClient.instance) {
      AxiosHttpClient.instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
        timeout: 15000, // Timeout de 15 segundos
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
        error => Promise.reject(error),
      );

      // Interceptor para tratamento de erros
      AxiosHttpClient.instance.interceptors.response.use(
        response => response,
        (error: AxiosError) => {
          // Obter mensagem de erro da API com tipagem correta
          const errorData = error.response?.data as ApiErrorResponse | undefined;
          const errorMessage = errorData?.error || errorData?.message;

          // Se o erro for 401 (Unauthorized), redirecionar para login
          if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
            return Promise.reject(
              new Error('Sua sessão expirou. Por favor, faça login novamente.'),
            );
          }

          // Tratamento personalizado por status
          if (error.response) {
            switch (error.response.status) {
              case 400:
                return Promise.reject(
                  new Error(
                    errorMessage || 'Dados inválidos. Verifique as informações fornecidas.',
                  ),
                );
              case 404:
                return Promise.reject(new Error('Recurso não encontrado.'));
              case 500:
                return Promise.reject(
                  new Error('Erro no servidor. Por favor, tente novamente mais tarde.'),
                );
              default:
                return Promise.reject(
                  new Error(errorMessage || 'Ocorreu um erro na comunicação com o servidor.'),
                );
            }
          }

          // Erro de rede ou timeout
          if (error.code === 'ECONNABORTED') {
            return Promise.reject(
              new Error('A requisição demorou muito tempo. Verifique sua conexão.'),
            );
          }

          return Promise.reject(error);
        },
      );
    }

    return AxiosHttpClient.instance;
  }
}
