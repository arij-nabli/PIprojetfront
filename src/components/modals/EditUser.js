import React from "react";
import { useState } from "react";
import axios from "axios";


export default function Modal({user}) {
  const [showModal, setShowModal] = React.useState(true);
   const [username, setUsername] = useState(user.username);
   const [email, setEmail] = useState(user.email);
   const [role, setRole] = useState(user.role);


    const handleRoleChange = (selectedRole) => {
      setRole(selectedRole);
    };

   const editUser = async (userId, username, email, role) => {
  try {
    // Validate input fields (optional but recommended)
    // ... (implement validation as needed)

    // Create a properly formatted request body
    const formData = {
      username,
      email,
      role,
    };

    const response = await axios.put(`http://localhost:5000/admin/edituser/${userId}`, formData, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      return true;
    } else {
      // Handle error response (e.g., display an error message)
      throw new Error(`Error updating user: ${response.data.message}`);
    }
  } catch (error) {
    // Handle unexpected errors
    throw error; // Re-throw the error to be handled by a higher-level error handler
  }
};
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col min-w-full bg-white outline-none focus:outline-none border-gray-300">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">User Details</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="my-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Username:
                    </label>
                    <input
                      type="text"
                      defaultValue={user.username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="my-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email:
                    </label>
                    <input
                      type="text"
                      defaultValue={user.email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="my-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Role:
                    </label>
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      defaultValue={user.role}
                      onChange={(e) => handleRoleChange(e.target.value)}
                    >
                      <option value="alumni">Alumni</option>
                      <option value="admin">Admin</option>
                      <option value="company">Company</option>
                      <option value="student">Student</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      editUser(user._id, username, email, role);
                      setShowModal(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
  
}

