import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserDetails({ user }) {
  const [showModal, setShowModal] = useState(true);
  const [cardData, setCardData] = useState([]);

  const fetchData = async () => {
    try {
      const id = user._id;
      let res = await axios.post("https://esprit-compass-backend.vercel.app/admin/getAllInfo", { id });
      setCardData(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${showModal ? "" : "hidden"}`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Details
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Username: {user.username}
                  </p>
                  <p className="text-sm text-gray-500">
                    Email: {user.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    Role: {user.role}
                  </p>
                  {user.role === "company" && cardData.company && (
                    <div>
                      <p className="text-sm text-gray-500">
                        Company name: {cardData.company.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Company Industry: {cardData.company.industry}
                      </p>
                      <p className="text-sm text-gray-500">
                        Company Description: {cardData.company.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}