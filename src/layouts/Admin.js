import React, { useEffect, useState } from "react";
import { Routes, Route,useNavigate,Navigate } from "react-router-dom";
import axios from "axios";
// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
// views
import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import AllUsersTable from "views/admin/AllUsersTable";
import HashLoader from "react-spinners/HashLoader";
import CompaniesTable from "views/admin/CompaniesTable";
export default function Admin() {
  
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
      <>
    
      <Sidebar />
      <div className=" md:ml-64 h-screen bg-blueGray-100">
        <AdminNavbar onSearchQueryChange={handleSearchQueryChange} />
        <HeaderStats />
        {/* Header */}
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companies" element={<CompaniesTable />} />
            <Route path="/all-users" element={<AllUsersTable />}/>
            <Route path="/settings"  element={<Settings />} />
            <Route path="/admin/tables" component={Tables} />
            <Route path="/" element={<Dashboard/>}  />
          </Routes>
        </div>
      
      </div>
    </>
    )}
  </>
    

  );
}
