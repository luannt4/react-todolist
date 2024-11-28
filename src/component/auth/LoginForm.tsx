// src/components/LoginForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../../contexts/auth/types';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAsync } from '../../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import {selectAuthError, selectAuthLoading} from "../../features/auth/authSelectors";

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectAuthLoading);
    const error = useAppSelector(selectAuthError);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginCredentials) => {
        const result = await dispatch(loginAsync({ username: data.username, password: data.password }));
        if (loginAsync.fulfilled.match(result)) {
            if (data.rememberMe) {
                localStorage.setItem('authUser', JSON.stringify(data));
            }
            navigate('/');
        }
    };

  return (
    <div className="max-w-md m-auto w-full space-y-8 bg-white p-8 rounded border shadow-md">
        <h2 className="mt-3 mb-0 text-center text-2xl font-medium tracking-tight text-gray-900">
            Sign in to your account demo
        </h2>
        <p className='text-center text-sm'>
            username: emilys <br></br>
            password: emilyspass
        </p>
        
        {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            
            <div className="mb-4">
                <label  htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                    id="username"
                    {...register('username', { 
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters"
                          }
                     })
                    }
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Username"
                />
                {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                     })
                    }
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Password"
                />
                {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
            </div>

            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                <input
                    id="remember-me"
                    type="checkbox"
                    {...register('rememberMe')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                </label>
                </div>

                <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </Link>
                </div>
            </div>
           

            <div className="mb-4">
                <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                {isLoading ? (
                    <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                    </span>
                ) : (
                    'Sign in'
                )}
                </button>
            </div>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Create an account
                    </Link>
                </p>
            </div>
        </form>
    </div>
    
  );
};
export default LoginForm;