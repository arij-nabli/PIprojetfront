import { useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';
export default function SetToken() {
  const location = useLocation();
    const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    localStorage.setItem('token', token);
    console.log("aaaaaaaaaa",token);
    const fetchUserData = async () => {
    
      try {
          const response = await axios.get(
              'http://esprit-compass-backend.vercel.app/auth/getUserDataFromToken',
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
              navigate('/profile');
          }

      } catch (error) {
          console.error(error);
      }
  };

  fetchUserData();
    // Redirect to profile or another page
  }, [location]);

  return (
  <LoadingScreen isLoading={true} />
  ); // or a loading spinner, etc.
}