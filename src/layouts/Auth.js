import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import colors, { red } from "tailwindcss/colors";

export default function Auth() {
  return (
    <>
      <Navbar/>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-custom-red bg-no-repeat bg-full"
            style={{
              backgroundImage: `url(${require("assets/img/register_bg_2.png").default})`,
              backgroundColor : colors.custom-red,
            }}
          ></div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth" element={<Navigate to="/auth/login" />} />
          </Routes>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
