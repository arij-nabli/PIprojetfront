import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NoAuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAuthenticated = token; // Convert token to boolean. If token exists, user is authenticated
 useEffect(() => {
    console.log('token',token)
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default NoAuthGuard;