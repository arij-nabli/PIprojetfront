import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const NoAuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAuthenticated = token; // Convert token to boolean. If token exists, user is authenticated
 useEffect(() => {

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
          const response = await axios.get(
              'http://localhost:5000/auth/getUserDataFromToken',
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
          console.log("role",response.data.user.role);
          if (response.data.user.role === 'company') {
              navigate('/company');
          }else if (response.data.user.role === 'admin') {
              navigate('/admin');
          }
          
          else {
              navigate(`/profile/${response.data.user._id}`);
          }

      } catch (error) {
          console.error(error);
      }
  };

  fetchUserData();
  }, [isAuthenticated, navigate]);

  return children;
};

export default NoAuthGuard;