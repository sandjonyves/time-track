export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  username?: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

export interface ErrorResponse {
  message: string;
  error?: string;
  errors?: Record<string, string[]>;
}
