import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts';

interface ForgotPasswordFormType {
  email: string;
}

export const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, isLoading, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormType>();

  const onSubmit = async (data: ForgotPasswordFormType) => {
    await forgotPassword(data.email);
  };

  return (
    <div className="max-w-lg m-auto w-full space-y-10 bg-white p-8 rounded border shadow-md">
        <h2 className="mt-3 text-center text-xl tracking-tight text-gray-900">
           We'll send you a link to reset your password
        </h2>
         {error && (
                <div className="text-red-600 text-sm">{error}</div>
         )}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="mb-4">
              <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="forgot-email"
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
                <button
                    type="submit"
                    disabled={isLoading}
                     className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                    {isLoading ? 'Sending...' : 'Reset Password'}
                </button>
            </div>
             <div className="text-center">
                <p className="text-sm text-gray-600">
                Back to{' '}
                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in now
                </a>
                </p>
            </div>
        </form>
    </div>
    
  );
};
