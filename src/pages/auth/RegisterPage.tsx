import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Phone } from 'lucide-react';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const password = watch('password', '');
  
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password
      });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('auth.register.title')}</h1>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t('auth.register.name')}
          type="text"
          id="name"
          leftIcon={<User size={18} className="text-gray-500" />}
          error={errors.name?.message}
          {...register('name', { 
            required: 'Name is required'
          })}
        />
        
        <Input
          label={t('auth.register.email')}
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
          label={t('auth.register.phone')}
          type="tel"
          id="phone"
          leftIcon={<Phone size={18} className="text-gray-500" />}
          error={errors.phone?.message}
          {...register('phone', { 
            pattern: {
              value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/i,
              message: 'Invalid phone number'
            } 
          })}
        />
        
        <Input
          label={t('auth.register.password')}
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
        
        <Input
          label={t('auth.register.confirmPassword')}
          type="password"
          id="confirmPassword"
          leftIcon={<Lock size={18} className="text-gray-500" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', { 
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match'
          })}
        />
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          fullWidth
          className="mb-4 mt-2"
        >
          {t('auth.register.button')}
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t('auth.register.hasAccount')}{' '}
            <Link to="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
              {t('auth.register.login')}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;