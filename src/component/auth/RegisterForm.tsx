// src/components/RegisterForm.tsx
import { useForm,SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../contexts';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RegisterCredentials } from '../../types/auth.types';
import { register as registerUser } from '../../features/auth/authSlice';

interface RegisterFormInputs extends RegisterCredentials {
  confirmPassword: string;
}

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const { confirmPassword, ...credentials } = data;
    await dispatch(registerUser(data));
  };

  return (
    <div className="max-w-lg m-auto w-full space-y-10 bg-white p-8 rounded border shadow-md">
        <h2 className="mt-3 text-center text-2xl font-medium tracking-tight text-gray-900">
             Create your account
        </h2>

        {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="mb-4">
                <label  htmlFor="register-username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                    id="register-username"
                    {...register('username', { 
                        required: 'Username is required',
                        minLength: {
                        value: 3,
                        message: 'Username must be at least 3 characters'
                    }
                    })}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Username"
                />
                {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
            </div>

            <div className="mb-4">
              <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="register-email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

             <div className="mb-4">
              <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="mb-4">
                <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                {isLoading ? 'Creating account...' : 'Register'}
                </button>
            </div>
            
            <div className="text-center">
                <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in now
                </Link>
                </p>
            </div>
        </form>
    </div>
    
  );
};