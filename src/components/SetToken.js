import { useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
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
    <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <HashLoader
      color={"#BD2C43"}
      loading={true}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
  ); // or a loading spinner, etc.
}