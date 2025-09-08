import { ApiService } from './api';
import type { User, AuthResponse, LoginFormData, RegisterFormData } from '../types/index';

export class AuthService {
  /**
   * Authenticate user with email and password
   */
  static async login(credentials: LoginFormData): Promise<AuthResponse> {
    const response = await ApiService.post<AuthResponse>('/login/', credentials);

    const user: User = {
      id: response.user?.id,
      email: response.user?.email,
      name: response.user?.name,
    };

    return { ...response, user };
  }

  /**
   * Register a new user
   */
  static async register(userData: RegisterFormData): Promise<AuthResponse> {
    const response = await ApiService.post<AuthResponse>('/register/', userData);

    const user: User = {
      id: response.user?.id,
      email: response.user?.email || userData.email,
      name: response.user?.name,
    };

    return { ...response, user };
  }

  /**
   * Logout user (invalidate session on server)
   */
  static async logout(): Promise<void> {
    try {
      await ApiService.post('/logout/', {});
    } catch (error) {
      console.warn('Logout API call failed, continuing with local logout:', error);
    }
  }

  /**
   * Refresh authentication tokens
   */
  static async refreshToken(): Promise<void> {
    await ApiService.post('/token-refresh/', {});
  }
}