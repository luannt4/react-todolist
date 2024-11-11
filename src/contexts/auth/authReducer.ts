// /contexts/authReducer.ts
import { User, AuthState } from './types';

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'FORGOT_PASSWORD_SUCCESS'; payload: string }
  | { type: 'REGISTER_SUCCESS' }
  | { type: 'LOGOUT' };

export const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('authUser') || 'null'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'FORGOT_PASSWORD_SUCCESS':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };  
    case 'REGISTER_SUCCESS':
            return { ...state,isLoading: false, error: null };    
    case 'LOGOUT':
      return initialState;
    
    default:
      return state;
  }
};