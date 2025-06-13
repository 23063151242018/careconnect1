
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('careconnect_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      id: Date.now(),
      email,
      role,
      name: role === 'patient' ? 'John Doe' : role === 'doctor' ? 'Dr. Sarah Smith' : 'Admin User',
      avatar: `https://images.unsplash.com/photo-${role === 'patient' ? '1472099645785-5658abf4ff4e' : role === 'doctor' ? '1559839734-2b71ea197ec2' : '1507003211169-0a1dd7228f2d'}?w=150&h=150&fit=crop&crop=face`,
      createdAt: new Date().toISOString()
    };
    
    setUser(userData);
    localStorage.setItem('careconnect_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (userData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      ...userData,
      id: Date.now(),
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
      createdAt: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('careconnect_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('careconnect_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
