import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";

export default function Modal({ user }) {
  const [showModal, setShowModal] = React.useState(true);
  const [cardData, SetcardData] = useState([]);


   const fetchData = async () => {
     try {
       const id = user._id; // Replace "your_user_id" with the actual user ID
       const data = { id }; 
       console.log(data)// Create an object with the user ID
       let res = await axios.post("http://localhost:5000/admin/getAllInfo", {
         id,
       });
       SetcardData(res.data);
       console.log(res.data);
     } catch (err) {
       console.log(err);
     }
   };

     useEffect(() => {
    fetchData();
  }, []);


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
                  <div className="mb-3">
                    <p className="my-4 mx-2">
                      {" "}
                      <span className="text-lg font-semibold">Username: </span>
                      {user.username}
                    </p>
                  </div>
                  <div className="mb-3">
                    <p className="my-4 mx-2">
                      {" "}
                      <span className="text-lg font-semibold">Email: </span>
                      {user.email}
                    </p>
                  </div>
                  <div className="mb-3">
                    <p className="my-4 mx-2">
                      {" "}
                      <span className="text-lg font-semibold">Role: </span>
                      {user.role}
                    </p>
                    {user.role === "company" && cardData.company && (
                      <div className="">
                        <div className="">
                          <p className="my-4 mx-2">
                            <span className="text-lg font-semibold">
                              Company name:{" "}
                            </span>
                            {cardData.company.name}
                          </p>
                          <p className="my-4 mx-2">
                            <span className="text-lg font-semibold">
                              Company Industry:{" "}
                            </span>
                            {cardData.company.industry}
                          </p>
                          <p className="my-4 mx-2">
                            <span className="text-lg font-semibold">
                              Company Description:{" "}
                            </span>
                            {cardData.company.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-white bg-red-700 rounded-md font-bold uppercase px-6 py-2 text-sm mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
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
