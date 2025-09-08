import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export class ApiService {
  private static axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
    withCredentials: true, 
  });

  private static setupInterceptors() {
    this.axiosInstance.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes('/token-refresh/')
        ) {
          originalRequest._retry = true;

          try {

            await this.axiosInstance.post('/token-refresh/');

            return this.axiosInstance(originalRequest);
          } catch (refreshError: any) {

            this.logout(); 
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private static async request<T>(endpoint: string, config: AxiosRequestConfig): Promise<T> {

    if (!this.axiosInstance.interceptors.response.handlers.length) {
      this.setupInterceptors();
    }

    const response = await this.axiosInstance.request<T>({ url: endpoint, ...config });
    return response.data;
  }

  static get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  static post<T>(endpoint: string, data?: any) {
    return this.request<T>(endpoint, { method: 'POST', data });
  }

  static put<T>(endpoint: string, data: any) {
    return this.request<T>(endpoint, { method: 'PUT', data });
  }

  static delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }


  static clearAuthToken() {
    delete this.axiosInstance.defaults.headers.common['Authorization'];
    document.cookie = 'access_token=; path=/; max-age=0';
    document.cookie = 'refresh_token=; path=/; max-age=0';
  }

 
  static logout() {
    this.clearAuthToken();
    window.location.href = '/login'; 
  }
}
