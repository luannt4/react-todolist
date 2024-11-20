// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginCredentials, RegisterCredentials, AuthState } from '../../types/auth.types';
import axios from 'axios';

export const login = createAsyncThunk<User,Omit<LoginCredentials, 'rememberMe'>,{ rejectValue: string }>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      localStorage.setItem('authUser', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const register = createAsyncThunk<User,RegisterCredentials,{ rejectValue: string }>(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email: string, { rejectWithValue }) => {
        try {
          const response = await axios.post('https://dummyjson.com/users/add', {
            email,
            message: 'Simulated password reset request',
          });
          return response.data;

        } catch (error: any) {
          return rejectWithValue(error.response?.data?.message || 'Something went wrong');
        }
      }
);

const storedUser = localStorage.getItem('authUser');
const user: User | null = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
    user:  user || null,
    isLoading: false,
    error: null,
    isLoggedIn: !!user,
    success: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        localStorage.removeItem('authUser');
        state.user = null;
        state.isLoggedIn = false;
        state.success = false;
      },
      clearError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ?? 'An error occurred';
        })
        .addCase(register.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false;
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ?? 'An error occurred';
        })
        .addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            
        })
        .addCase(forgotPassword.fulfilled, (state) => {
            state.isLoading = false;
            state.success = true;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error =  action.payload as string;
        });
    },
  });
  
  export const { logout, clearError } = authSlice.actions;
  export default authSlice.reducer;