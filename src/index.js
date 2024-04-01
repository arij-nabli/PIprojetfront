import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/styles/index.css'
// layouts
import Admin from 'layouts/Admin.js'
import Auth from 'layouts/Auth.js'
// views without layouts
import Landing from 'views/Landing.js'
import Profile from "views/profile/Profile.js";
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthGuard from 'components/AuthGuard'
import NoAuthGuard from 'components/NoAuthGuard'
import Offer from 'views/offer/OffersPage'
import DetailsOffer from "views/offer/DetailsOffer";
import SetToken from 'components/SetToken'
import ContactUs from 'views/ContactUs'
import Company from 'layouts/Company'
import ApplicationsByUser from 'views/application/applicationsByUser'
function MainApp() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false)
    }

    return () => window.removeEventListener('load', handleLoad)
  }, [])

  return (
    <GoogleOAuthProvider clientId='305919606485-hj7u2mmjvcoaa7blqet64uglmpu3e6aa.apps.googleusercontent.com'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/admin/*'
            element={
              <AuthGuard>
                <Admin />
              </AuthGuard>
            }
          />
          <Route
            path='/auth/*'
            element={
              <NoAuthGuard>
                <Auth />
              </NoAuthGuard>
            }
          />
          <Route path='/company/*' element={<AuthGuard><Company /></AuthGuard>} />
          <Route path='/landing' exact element={<Landing />} />
          <Route path='/profile' exact element={<AuthGuard><Profile /></AuthGuard>} />
          <Route path='/applications/:candidateId' exact element={<AuthGuard> <ApplicationsByUser /> </AuthGuard>} />
          
          <Route
            path='/offer'
            exact
            element={
              <AuthGuard>
                <Offer />
              </AuthGuard>
            }
          />
          <Route path='/set-token' exact element={<SetToken />} />
          <Route path='/offer-details/:id' exact element={<DetailsOffer />} />
          <Route path='/contactus' exact element={<ContactUs />} />
          <Route path='/' exact element={<Auth />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />)
