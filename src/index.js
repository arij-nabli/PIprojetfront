import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/index.css";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import { GoogleOAuthProvider } from '@react-oauth/google';
import HashLoader from "react-spinners/HashLoader";
import AuthGuard from "components/AuthGuard";
import NoAuthGuard from "components/NoAuthGuard";
import SetToken from "components/SetToken";
function MainApp() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };


    return () => window.removeEventListener('load', handleLoad);
  }, []);

 
  return (
    <GoogleOAuthProvider clientId="305919606485-hj7u2mmjvcoaa7blqet64uglmpu3e6aa.apps.googleusercontent.com">
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AuthGuard><Admin /></AuthGuard>} />
        <Route path="/auth/*" element={<NoAuthGuard><Auth /></NoAuthGuard>} />
        <Route path="/landing" exact element={<Landing />} />
        <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
        <Route path="/" exact element={<Auth />} />
        <Route path="/set-token" element={<SetToken />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);