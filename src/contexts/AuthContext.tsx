import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: { name: string; email: string; phone?: string }) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
  changePassword: async () => {},
});

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  
  // On mount, check for stored user
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  // Simulated login function (would connect to backend in real app)
  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    // Simulating network request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo purposes, accept any non-empty values
    if (email && password) {
      const newUser = {
        id: 'user-1',
        name: 'Client Test',
        email: email,
        phone: '+229 00000000'
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      throw new Error('Email and password are required');
    }
  };
  
  // Simulated register function
  const register = async (userData: { name: string; email: string; password: string; phone?: string }) => {
    // In a real app, this would be an API call
    // Simulating network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any valid data
    if (userData.name && userData.email && userData.password) {
      const newUser = {
        id: 'user-' + Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || ''
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      throw new Error('All required fields must be filled');
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  // Update profile function
  const updateProfile = async (userData: { name: string; email: string; phone?: string }) => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (user) {
      const updatedUser = {
        ...user,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || user.phone
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };
  
  // Change password function
  const changePassword = async (currentPassword: string, newPassword: string) => {
    // In a real app, this would verify the current password and update
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo, just simulate success
    if (!currentPassword || !newPassword) {
      throw new Error('Both current and new passwords are required');
    }
    
    // Password change successful (would verify in real app)
    return;
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    updateProfile,
    changePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};