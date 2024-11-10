// /contexts/AuthContext.tsx
import { createContext} from 'react';
import { LoginCredentials, RegisterInputs, AuthState } from './types';


interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterInputs) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);