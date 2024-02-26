import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route,Routes,Navigate} from "react-router-dom";
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="305919606485-hj7u2mmjvcoaa7blqet64uglmpu3e6aa.apps.googleusercontent.com">

  <BrowserRouter>
    <Routes>
      {/* add routes with layouts */}
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/auth/*" element={<Auth />} />
      {/* add routes without layouts */}
      <Route path="/landing" exact element={<Landing />} />
      <Route path="/profile" exact element={<Profile/>} />
      <Route path="/" exact element={<Index />}/>
      {/* add redirect for first page */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  </BrowserRouter>
      </GoogleOAuthProvider>,

 
);
