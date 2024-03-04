import React from "react";
import { useState } from "react";
import { Axios } from "axios";

export default function Modal({user}) {
  const [showModal, setShowModal] = React.useState(true);
   const [username, setUsername] = useState(user.username);
   const [email, setEmail] = useState(user.email);
   const [role, setRole] = useState(user.role);
   const [error, setError] = useState(null);

    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };

    const handleEditUser = async (userId) => {
      try {
        const response = await Axios.post(`/api/users/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            role,
          }),
        });

        if (response.ok) {
          // Handle successful update (e.g., close modal, display success message)
          console.log("User updated successfully!");
          // Call your logic to close the modal after successful update
        } else {
          setError("Error updating user. Please try again.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">User Details</h3>
                  <button
                    className="p-1 ml-auto bg-red border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-red text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto max-w-6xl">
                  <div class="relative flex w-full flex-wrap items-stretch mb-3">
                    <label className="my-4 mx-2">Username:</label>
                    <input
                      type="text"
                      defaultValue={user.username}
                      onChange={(e) => setUsername(e.target.value)}
                      class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                    />
                    <span class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 right-0 pr-3 py-4"></span>
                  </div>
                  <div class="relative flex w-full flex-wrap items-stretch mb-3">
                    <label className="my-4 mx-2">email:</label>
                    <input
                      type="text"
                      defaultValue={user.email}
                      onChange={(e) => setEmail(e.target.value)}
                      class="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-base shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                    />
                    <span class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 right-0 pr-3 py-4"></span>
                  </div>

                  <div className="container flex-col">
                    <label className="mr-4">Role:</label>
                    <select
                      className="p-auto text-sm font-semibold inline-block px-4 rounded-full uppercase last:mr-0 mr-1"
                      onChange={(e) => handleRoleChange(e.target.value)}
                    >
                      role :<option>{user.role}</option>
                      <option className="px-3">company</option>
                      <option className="px-3">Student</option>
                    </select>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => (setShowModal(false))}
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

