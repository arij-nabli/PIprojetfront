import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import React, { useState } from 'react';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center">
      {/* Navbar */}
      <div className="w-full text-white bg-main-color">
        <Navbar transparent />
      </div>

      <div className="container mx-auto my-5 p-12">
        <div className="md:flex md:-mx-0">
          {/* Left Side */}
          <div className="w-full md:w-8/12"> {/* Adjusted width */}
            <div className="bg-white p-3 border-t-4 border-blue-400">
              <div className="image overflow-hidden w-30 float-left mr-4"> {/* Adjusted image size and added float-left and margin */}
                <img className="h-auto w-full" src="logocompany.jpg" alt="Company Logo" />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">Company Name</h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">Industry Type</h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Description of the company.</p>

              {/* Additional information about the company */}
              <div className="mt-4">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span className="text-blue-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span className="tracking-wide">Additional Information</span>
                </div>
                <ul className="list-inside space-y-2">
                  <li>
                    <span className="font-semibold">Location:</span> Company Location
                  </li>
                  <li>
                    <span className="font-semibold">Founded:</span> Year Founded
                  </li>
                  {/* Add more details as needed */}
                </ul>
              </div>
            </div>

            {/* Similar Companies card */}
            {/* ... Similar Companies code ... */}
          </div>
          {/* End of Left Side */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
