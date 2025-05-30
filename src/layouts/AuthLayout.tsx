import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const isProfilePage = window.location.pathname === '/auth/profile';
  
  // Redirect to home if trying to access login/register while authenticated
  if (isAuthenticated && !isProfilePage) {
    return <Navigate to="/" replace />;
  }
  
  // Redirect to login if trying to access profile while not authenticated
  if (!isAuthenticated && isProfilePage) {
    return <Navigate to="/auth/login\" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700">
          <ArrowLeft size={16} className="mr-1" />
          <span>{t('nav.home')}</span>
        </Link>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;