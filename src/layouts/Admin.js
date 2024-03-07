import React, { useEffect, useState } from "react";
import { Routes, Route,useNavigate,Navigate } from "react-router-dom";
import axios from "axios";
// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import CardTable from "components/Cards/CardTable.js";
// views
import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import CardSettings from "components/Cards/CardSettings";
import HashLoader from "react-spinners/HashLoader";
export default function Admin() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const handleAddUserClick = () => {
    setShowForm(!showForm);
  };

    const handleAdminAdded = () => {
      setShowForm(false);
      // Additional logic or actions to perform after admin is added
    };

     const handleSearchQueryChange = (query) => {
       setSearchQuery(query);
     };

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
          console.log(response.data);
            if (response.data.user.role != "admin"){
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
      <>
    
      <Sidebar />
      <div className="relative h-screen md:ml-64 bg-blueGray-100">
        <AdminNavbar onSearchQueryChange={handleSearchQueryChange} />
        {/* Header */}
        <HeaderStats />

        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          </Routes>
        </div>
        <div className="relative md:ml-12 pl-6 w-11/12 bg-blueGray-100">
          {showForm ? (
            <button
              className="bg-red-500 text-white p-2 mb-3 rounded-md"
              onClick={handleAddUserClick}
            >
              Return
            </button>
          ) : (
            <button
              className="bg-green-500 text-white p-2 mb-3 rounded-md"
              onClick={handleAddUserClick}
            >
              Add Admin
            </button>
          )}
          {showForm ? (
            <CardSettings onAdminAdded={handleAdminAdded} />
          ) : (
            <CardTable searchQuery={searchQuery} />
          )}
        </div>
        <div className="fixed bottom-0 w-full bg-gray-100 text-white">
        </div>
      </div>
    </>
    )}
  </>
    

  );
}
