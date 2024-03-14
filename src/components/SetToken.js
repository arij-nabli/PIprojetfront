import { useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

export default function SetToken() {
  const location = useLocation();
    const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    localStorage.setItem('token', token);
    console.log("aaaaaaaaaa",token);
    navigate('/offer');
    // Redirect to profile or another page
  }, [location]);

  return null; // or a loading spinner, etc.
}