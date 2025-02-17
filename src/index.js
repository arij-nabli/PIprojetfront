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
import Profile from "views/profile/Profile.js";
import Index from "views/Index.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthGuard from "components/AuthGuard";
import NoAuthGuard from "components/NoAuthGuard";
import Offer from "views/offer/OffersPage";
import DetailsOffer from "views/offer/DetailsOffer";
import SetToken from "components/SetToken";
import ContactUs from "views/ContactUs";
import ProfileCompany from "views/profile/ProfileCompany";
import AdminContactPage from "views/admin/AdminContactPage";
import Company from "layouts/Company";
import ApplicationsByUser from "views/application/applicationsByUser";
import Experiences from "views/profile/Experiences";
import Cv from "views/profile/Cv";
import InterviewRoom from "views/InterviewRoom/InterviewRoom";
import { ContextProvider } from "views/InterviewRoom/socketContext";
import VideoPlayer from "views/InterviewRoom/VideoPlayer";
import Resume from 'views/profile/Resume'
import Chat from 'views/realtime-chat/Chat'
import VideoCv from 'views/profile/VideoCv'
import Record from 'views/profile/Rcord'
function MainApp() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <GoogleOAuthProvider clientId="305919606485-hj7u2mmjvcoaa7blqet64uglmpu3e6aa.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <AuthGuard>
                <Admin />
              </AuthGuard>
            }
          />
          <Route
            path="/auth/*"
            element={
              <NoAuthGuard>
                <Auth />
              </NoAuthGuard>
            }
          />
          <Route
            path="/company/*"
            element={
              <AuthGuard>
                <Company />
              </AuthGuard>
            }
          />
          <Route path="/landing" exact element={<Landing />} />
          {/*<Route path='/profile' exact element={<Profile />} />*/}
          <Route path="/AdminContacts" exact element={<AdminContactPage />} />
          <Route path="/trycv" exact element={<Cv />} />

          <Route path="/Experiences" exact element={<Experiences />} />
          <Route path='/videocv' exact element={<VideoCv />} />
          <Route path='/record' exact element={<Record />} />

          <Route path="/profileCompany" exact element={<ProfileCompany />} />
          <Route path="/chat/:senderId/:receiverId" exact element={<Chat />} />
          <Route
            path="/profile/:userId"
            exact
            key="profile"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />
          <Route
            path="/applications/:candidateId"
            exact
            element={
              <AuthGuard>
                {" "}
                <ApplicationsByUser />{" "}
              </AuthGuard>
            }
          />

          <Route
            path="/offer"
            exact
            element={
              <AuthGuard>
                <Offer />
              </AuthGuard>
            }
          />
                    <Route path='/profil' exact element={<AuthGuard><Chat /> </AuthGuard>} />

          <Route path="/AdminContacts" exact element={<AdminContactPage />} />

          <Route path="/set-token" exact element={<SetToken />} />
          <Route path="/offer-details/:id" exact element={<DetailsOffer />} />
          <Route path="/contactus" exact element={<ContactUs />} />
          <Route path="/" exact element={<Auth />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/interview-room"
            exact
            element={
                <ContextProvider>
                <InterviewRoom />
              </ContextProvider>
            }
          />
                    <Route path='/cv' exact element={<Resume/>} />

        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<MainApp />);
