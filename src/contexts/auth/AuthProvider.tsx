import React, {useReducer, useCallback,useEffect } from 'react';
import { authReducer, initialState } from './authReducer';
import { LoginCredentials, RegisterInputs } from './types';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (state.isAuthenticated && state.user) {
            localStorage.setItem('authUser', JSON.stringify(state.user));
        } 
    }, [state.isAuthenticated, state.user]);

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
            
            if (data.username && data.accessToken) {
                dispatch({ type: 'AUTH_SUCCESS', payload: data });
                
                if (credentials.rememberMe) {
                    localStorage.setItem('authUser', JSON.stringify(data));
                }
                navigate('/');
            } else {
                dispatch({ type: 'AUTH_ERROR', payload: 'Invalid username or password' });
            }
        } catch (error) {
            dispatch({ type: 'AUTH_ERROR', payload: 'Login failed' });
        }
    }, [navigate]);

    const register = async (credentials: RegisterInputs) => {
        try {
            dispatch({ type: 'AUTH_START' });
            const response = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            if (data.id) {
                dispatch({ type: 'REGISTER_SUCCESS' });
                navigate('/login');
            } else {
                dispatch({ type: 'AUTH_ERROR', payload: 'Registration failed' });
            }

            // After successful registration, login the user
            /*await login({
                username: credentials.username,
                password: credentials.password,
                rememberMe: false,
            });*/
        } catch (error) {
            dispatch({ type: 'AUTH_ERROR', payload: 'Registration error' });
        }
    };

    const logout = useCallback(() => {
        localStorage.removeItem('authUser');
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    }, [navigate]);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      dispatch({ type: 'AUTH_START' });
      // Note: DummyJSON doesn't have a forgot password endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mocking a success message for password recovery
      dispatch({ type: 'FORGOT_PASSWORD_SUCCESS', payload: `Password reset link sent to ${email}` });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Failed to send password reset link'  });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

