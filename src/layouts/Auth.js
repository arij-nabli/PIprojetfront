import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import colors, { red } from "tailwindcss/colors";
import CompanyRegister from "views/auth/CompanyRegister";
import ForgotPassword from "views/auth/ForgotPassword";
export default function Auth() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-custom-red bg-no-repeat bg-full"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(239,201,209,1) 0%, rgba(189,44,67,1) 37%, rgba(111,16,61,1) 88%)`,
              backgroundColor: 'rgb(239,201,209)',
            }}
          ></div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register/user" element={<Register />} />
            <Route path="/register/company" element={<CompanyRegister/>} />
            <Route path="/reset-password" element={<ForgotPassword />} /> 
            <Route path="/auth" element={<Navigate to="/auth/login" />} />
          </Routes>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
