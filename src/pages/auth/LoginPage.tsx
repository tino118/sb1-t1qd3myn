import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock } from 'lucide-react';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('auth.login.title')}</h1>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t('auth.login.email')}
          type="email"
          id="email"
          leftIcon={<Mail size={18} className="text-gray-500" />}
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            } 
          })}
        />
        
        <Input
          label={t('auth.login.password')}
          type="password"
          id="password"
          leftIcon={<Lock size={18} className="text-gray-500" />}
          error={errors.password?.message}
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
        />
        
        <div className="text-right mb-6">
          <Link to="/auth/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
            {t('auth.login.forgotPassword')}
          </Link>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          fullWidth
          className="mb-4"
        >
          {t('auth.login.button')}
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t('auth.login.noAccount')}{' '}
            <Link to="/auth/register" className="text-primary-600 hover:text-primary-700 font-medium">
              {t('auth.login.register')}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;