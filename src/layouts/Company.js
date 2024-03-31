import React, { useEffect, useState } from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import axios from "axios";
// components
import ApplicationsByOffer from "views/application/ApplicationsByOffer";
import CompanyOffers from "views/offer/CompanyOffers";
import ProfileCompany from "views/profile/ProfileCompany";
import AddOffer from "views/offer/AddOffer";
import HashLoader from "react-spinners/HashLoader";
import Navbar from "components/Navbars/CompanyNavbar";
export default function Company() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 

  const navigate = useNavigate();


     useEffect(() => {
      
      const token = localStorage.getItem('token');
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/auth/getUserDataFromToken",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
         
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
     <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
     <HashLoader
       color={"#BD2C43"}
       loading={isLoading}
       size={150}
       aria-label="Loading Spinner"
       data-testid="loader"
     />
   </div>
    ) : (
      <div className="relative w-full h-full bg-gray-100   min-h-screen">
    
   <Navbar />
      
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
