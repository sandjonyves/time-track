import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

export class ApiService {
  private static axiosInstance = axios.create({
    baseURL: this.getBaseURL(),
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
  });

  private static isRefreshing = false;
  private static failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
  }> = [];

  static {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
        
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(() => {
              return this.axiosInstance.request(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
      
            await this.refreshToken();
            
        
            this.processQueue(null);
            
    
            return this.axiosInstance.request(originalRequest);
          } catch (refreshError) {
          
            this.processQueue(refreshError);
            
     
            this.redirectToLogin();
            
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private static getBaseURL(): string {
    if (import.meta.env.MODE === 'development') {
      return '/api';
    } else {
      return 'https://api.monsite.com/api';
    }
  }

  private static async refreshToken(): Promise<void> {
    try {
 
      const response = await axios.post(`${this.getBaseURL()}/token-refresh/`, {}, {
        withCredentials: true,
      });

   ;
      
      console.log('Token refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  }

  private static processQueue(error: any): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
    
    this.failedQueue = [];
  }

  private static redirectToLogin(): void {
  
    window.location.href = '/login';
    
    console.log('Redirecting to login due to authentication failure');
  }

  private static async request<T>(endpoint: string, config: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.request<T>({ url: endpoint, ...config });
    return response.data;
  }

  static get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  static post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', data });
  }

  static put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', data });
  }

  static delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Méthode utilitaire pour forcer une déconnexion
  static logout(): void {
    this.redirectToLogin();
  }

 
}