import React from "react";

import AdminDropdown from "components/Dropdowns/adminDropdown";

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="w-full p-4 z-10 bg-transparent  justify-center flex items-center ">
        <div className="items-center w-full flex  justify-center">
          {/* Brand */}
          <a
            className="text-black text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relativ bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
          {/* User */}
          <ul className=" ">
            <AdminDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
