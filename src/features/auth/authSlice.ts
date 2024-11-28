// src/features/auth/authSlice.ts
import { createSlice,  PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from './auth.types';
import {loginAsync, registerAsync, forgotPasswordAsync} from './authThunks'

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
        .addCase(loginAsync.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginAsync.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        })
        .addCase(loginAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ?? 'An error occurred';
        })
        .addCase(registerAsync.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(registerAsync.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(registerAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ?? 'An error occurred';
        })
        .addCase(forgotPasswordAsync.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            
        })
        .addCase(forgotPasswordAsync.fulfilled, (state) => {
            state.isLoading = false;
            state.success = true;
        })
        .addCase(forgotPasswordAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error =  action.payload as string;
        });
    },
  });
  
  export const { logout, clearError } = authSlice.actions;
  export default authSlice.reducer;