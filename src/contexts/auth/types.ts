// /contexts/types.ts
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterInputs {
  username: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}