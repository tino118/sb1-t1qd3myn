import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-primary-600 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" x2="20" y1="19" y2="19"></line>
              </svg>
            </div>
            <span className="font-heading font-bold text-xl text-gray-900">Support IT Bénin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/">{t('nav.home')}</NavLink>
            <NavLink to="/services">{t('nav.services')}</NavLink>
            <NavLink to="/contact">{t('nav.contact')}</NavLink>
            <NavLink to="/faq">{t('nav.faq')}</NavLink>
            
            {isAuthenticated && (
              <NavLink to="/client">
                <div className="flex items-center">
                  <LayoutDashboard size={16} className="mr-1" />
                  Espace client
                </div>
              </NavLink>
            )}
            
            {/* Language Switcher */}
            <div className="relative ml-2">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
              >
                <Globe size={18} className="mr-1" />
                <span>{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                  <button
                    onClick={() => changeLanguage('fr')}
                    className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === 'fr' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === 'en' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>
            
            {/* Auth Buttons */}
            <div className="ml-4 flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <Link to="/auth/profile">
                    <Button variant="outline\" size="sm">{t('nav.profile')}</Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    {t('nav.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth/login">
                    <Button variant="outline" size="sm">{t('nav.login')}</Button>
                  </Link>
                  <Link to="/auth/register">
                    <Button variant="primary" size="sm">{t('nav.register')}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-lg mt-4 py-2 animate-fade-in">
            <MobileNavLink to="/">{t('nav.home')}</MobileNavLink>
            <MobileNavLink to="/services">{t('nav.services')}</MobileNavLink>
            <MobileNavLink to="/contact">{t('nav.contact')}</MobileNavLink>
            <MobileNavLink to="/faq">{t('nav.faq')}</MobileNavLink>
            
            {isAuthenticated && (
              <MobileNavLink to="/client">
                <div className="flex items-center">
                  <LayoutDashboard size={16} className="mr-2" />
                  Espace client
                </div>
              </MobileNavLink>
            )}
            
            {/* Language options */}
            <div className="px-4 py-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">{t('nav.language')}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => changeLanguage('fr')}
                  className={`px-3 py-1 text-sm rounded ${i18n.language === 'fr' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Français
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-3 py-1 text-sm rounded ${i18n.language === 'en' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  English
                </button>
              </div>
            </div>
            
            {/* Auth buttons */}
            <div className="mt-4 px-4 pt-2 border-t border-gray-100">
              {isAuthenticated ? (
                <>
                  <Link to="/auth/profile\" className="block w-full mb-2">
                    <Button variant="outline\" fullWidth>{t('nav.profile')}</Button>
                  </Link>
                  <Button variant="ghost" fullWidth onClick={logout}>
                    {t('nav.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" className="block w-full mb-2">
                    <Button variant="outline" fullWidth>{t('nav.login')}</Button>
                  </Link>
                  <Link to="/auth/register" className="block w-full">
                    <Button variant="primary" fullWidth>{t('nav.register')}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop Nav Link
const NavLink: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'text-primary-600'
          : 'text-gray-700 hover:text-primary-600'
      }`}
    >
      {children}
    </Link>
  );
};

// Mobile Nav Link
const MobileNavLink: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`block px-4 py-2 text-base ${
        isActive
          ? 'bg-primary-50 text-primary-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;