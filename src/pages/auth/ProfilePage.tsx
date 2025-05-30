import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Mail, User, Phone, Lock } from 'lucide-react';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateProfile, changePassword } = useAuth();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  
  const { 
    register: registerProfile, 
    handleSubmit: handleProfileSubmit, 
    formState: { errors: profileErrors } 
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    }
  });
  
  const { 
    register: registerPassword, 
    handleSubmit: handlePasswordSubmit, 
    watch,
    reset: resetPassword,
    formState: { errors: passwordErrors } 
  } = useForm<PasswordFormData>();
  
  const newPassword = watch('newPassword', '');
  
  const onProfileSubmit = async (data: ProfileFormData) => {
    setIsProfileLoading(true);
    setProfileError(null);
    setProfileSuccess(false);
    
    try {
      await updateProfile({
        name: data.name,
        email: data.email,
        phone: data.phone
      });
      setProfileSuccess(true);
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : 'An error occurred while updating profile');
    } finally {
      setIsProfileLoading(false);
      
      // Hide success message after 3 seconds
      if (profileSuccess) {
        setTimeout(() => setProfileSuccess(false), 3000);
      }
    }
  };
  
  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(false);
    
    try {
      await changePassword(data.currentPassword, data.newPassword);
      setPasswordSuccess(true);
      resetPassword();
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'An error occurred while changing password');
    } finally {
      setIsPasswordLoading(false);
      
      // Hide success message after 3 seconds
      if (passwordSuccess) {
        setTimeout(() => setPasswordSuccess(false), 3000);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('auth.profile.title')}</h1>
      </div>
      
      {/* Personal Information Form */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{t('auth.profile.personalInfo')}</h2>
        
        {profileError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {profileError}
          </div>
        )}
        
        {profileSuccess && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md text-sm">
            Profile updated successfully!
          </div>
        )}
        
        <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
          <Input
            label={t('auth.profile.name')}
            type="text"
            id="name"
            leftIcon={<User size={18} className="text-gray-500" />}
            error={profileErrors.name?.message}
            {...registerProfile('name', { 
              required: 'Name is required'
            })}
          />
          
          <Input
            label={t('auth.profile.email')}
            type="email"
            id="email"
            leftIcon={<Mail size={18} className="text-gray-500" />}
            error={profileErrors.email?.message}
            {...registerProfile('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              } 
            })}
          />
          
          <Input
            label={t('auth.profile.phone')}
            type="tel"
            id="phone"
            leftIcon={<Phone size={18} className="text-gray-500" />}
            error={profileErrors.phone?.message}
            {...registerProfile('phone', { 
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/i,
                message: 'Invalid phone number'
              } 
            })}
          />
          
          <Button
            type="submit"
            variant="primary"
            isLoading={isProfileLoading}
            className="mt-2"
          >
            {t('auth.profile.updateButton')}
          </Button>
        </form>
      </div>
      
      {/* Change Password Form */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{t('auth.profile.passwordChange')}</h2>
        
        {passwordError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {passwordError}
          </div>
        )}
        
        {passwordSuccess && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md text-sm">
            Password changed successfully!
          </div>
        )}
        
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
          <Input
            label={t('auth.profile.currentPassword')}
            type="password"
            id="currentPassword"
            leftIcon={<Lock size={18} className="text-gray-500" />}
            error={passwordErrors.currentPassword?.message}
            {...registerPassword('currentPassword', { 
              required: 'Current password is required'
            })}
          />
          
          <Input
            label={t('auth.profile.newPassword')}
            type="password"
            id="newPassword"
            leftIcon={<Lock size={18} className="text-gray-500" />}
            error={passwordErrors.newPassword?.message}
            {...registerPassword('newPassword', { 
              required: 'New password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          
          <Input
            label={t('auth.profile.confirmNewPassword')}
            type="password"
            id="confirmNewPassword"
            leftIcon={<Lock size={18} className="text-gray-500" />}
            error={passwordErrors.confirmNewPassword?.message}
            {...registerPassword('confirmNewPassword', { 
              required: 'Please confirm your new password',
              validate: value => value === newPassword || 'Passwords do not match'
            })}
          />
          
          <Button
            type="submit"
            variant="primary"
            isLoading={isPasswordLoading}
            className="mt-2"
          >
            {t('auth.profile.changePasswordButton')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;