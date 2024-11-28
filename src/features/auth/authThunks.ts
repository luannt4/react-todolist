import { createAsyncThunk } from '@reduxjs/toolkit';
import {forgotPasswordAPI, loginAPI, registerAPI} from './authAPI';
import {LoginCredentials, RegisterCredentials, User} from "./auth.types";

export const loginAsync = createAsyncThunk<User,Omit<LoginCredentials, 'rememberMe'>,{ rejectValue: string }>(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await loginAPI( username, password );
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

export const registerAsync = createAsyncThunk<User,RegisterCredentials,{ rejectValue: string }>(
    'auth/register',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await registerAPI(credentials);
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

export const forgotPasswordAsync = createAsyncThunk(
    'auth/forgotPassword',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await forgotPasswordAPI(email);
            return response.data;

        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Something went wrong');
        }
    }
);