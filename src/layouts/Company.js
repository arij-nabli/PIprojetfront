import React, { useEffect, useState } from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import axios from "axios";
// components
import ApplicationsByOffer from "views/application/ApplicationsByOffer";
import CompanyOffers from "views/offer/CompanyOffers";
import ProfileCompany from "views/profile/ProfileCompany";
import AddOffer from "views/offer/addOffer";
import Navbar from "components/Navbars/CompanyNavbar";
import LoadingScreen from "components/LoadingScreen";
export default function Company() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [user, setUser] = useState({});
  const navigate = useNavigate();


     useEffect(() => {
      
      const token = localStorage.getItem('token');
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "https://esprit-compass-backend.vercel.app/auth/getUserDataFromToken",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data.user);
            if (response.data.user.role !== "company"){
              navigate("/auth/login")
            }
            else{
              setIsLoading(false);
            }
        } catch (error) {
          console.error(error);
           setIsLoading(false);
        }
      };
  
      fetchUserData();
    
     })
     const handleSearchQueryChange = (query) => {
      setSearchQuery(query);
    };
  return (
    <>
    {isLoading ? (
  <LoadingScreen  isLoading={true} />
    ) : (
      <div className="relative w-full h-full bg-gray-100   min-h-screen">
    
   <Navbar id={user._id}/>
      
        {/* Header */}
          <Routes>
          <Route path='/Myoffers' exact element={<CompanyOffers />} />
          <Route path='/profile' exact element={<ProfileCompany/>} />
          <Route path='/add-offer' exact element={<AddOffer />} />
          <Route path='*' element={<CompanyOffers />} />
          <Route path='/applications/:offerId' element={<ApplicationsByOffer />} />
          </Routes>
 
      

    </div>
    )}
  </>
    

  );
}
