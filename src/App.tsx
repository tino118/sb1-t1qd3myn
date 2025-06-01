import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ClientLayout from './layouts/ClientLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/auth/ProfilePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import NotFoundPage from './pages/NotFoundPage';

// Client Pages
import DashboardPage from './pages/client/DashboardPage';
import TicketsPage from './pages/client/TicketsPage';
import CreateTicketPage from './pages/client/CreateTicketPage';
import TicketDetailPage from './pages/client/TicketDetailPage';

// Components
import LoadingSpinner from './components/ui/LoadingSpinner';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthProvider>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="faq" element={<FaqPage />} />
            </Route>
            
            <Route path="/client" element={<ClientLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="tickets" element={<TicketsPage />} />
              <Route path="tickets/create" element={<CreateTicketPage />} />
              <Route path="tickets/:id" element={<TicketDetailPage />} />
            </Route>
            
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </Suspense>
  );
}

export default App;