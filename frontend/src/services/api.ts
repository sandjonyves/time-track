import axios, { type AxiosRequestConfig } from 'axios';

export class ApiService {
  private static axiosInstance = axios.create({
    baseURL: this.getBaseURL(),
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
  });

 
  private static getBaseURL(): string {
    if (import.meta.env.MODE === 'development') {
      
      return '/api';
    } else {
      
      return 'https://api.monsite.com/api';
    }
  }

  private static async request<T>(endpoint: string, config: AxiosRequestConfig): Promise<T> {
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
}
