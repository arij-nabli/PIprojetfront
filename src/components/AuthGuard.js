import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAuthenticated = token; // Convert token to boolean. If token exists, user is authenticated
 useEffect(() => {
    console.log('token',token)
    if (!isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default AuthGuard;