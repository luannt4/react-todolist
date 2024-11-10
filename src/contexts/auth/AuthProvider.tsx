import React, {useReducer, useCallback } from 'react';
import { authReducer, initialState } from './authReducer';
import { LoginCredentials, RegisterInputs } from './types';
import { AuthContext } from './AuthContext';


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    
    const login = useCallback(async (credentials: LoginCredentials) => {
        try {
        dispatch({ type: 'AUTH_START' });
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        
        dispatch({ type: 'AUTH_SUCCESS', payload: data });
        localStorage.setItem('auth_token', data.accessToken);
        window.location.href = '/dashboard';

        } catch (error) {
            dispatch({ type: 'AUTH_ERROR', payload: error instanceof Error ? error.message : 'Login failed' });
        }
    }, []);

  const register = useCallback(async (credentials: RegisterInputs) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      
      // After successful registration, login the user
      await login({
        username: credentials.username,
        password: credentials.password
      });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error instanceof Error ? error.message : 'Registration failed' });
    }
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/';
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      // Note: DummyJSON doesn't have a forgot password endpoint
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: 'AUTH_SUCCESS', payload: { message: 'Reset link sent' } as any });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Failed to send reset link' });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

