import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import EditUser from "../modals/EditUser";
import UserDetails from "../modals/UserDetails";

export default function CardTable({ color, searchQuery }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUser, setIsModalOpenUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [tableData, setTableData] = useState([]);

  const toggleModal = (index) => {
    const userIndex = indexOfFirstItem + index;
    setSelectedUser(tableData[userIndex]);
    setIsModalOpen(!isModalOpen);
    console.log(selectedUser);
  };
  const toggleModalUser = (index) => {
    const userIndex = indexOfFirstItem + index;
    setSelectedUser(tableData[userIndex]);
    setIsModalOpenUser(!isModalOpenUser);
  };

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/admin/allusers");
    setTableData(response.data);
  };

  const deleteUser = async (userId) => {
    console.log(userId);
    try {
      const res = await axios.delete(
        `http://localhost:5000/admin/deleteuser/${userId}`
      );
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  const banUser = async (userId) => {
    try {
      const res = await axios.put(`http://localhost:5000/admin/ban/${userId}`);
      console.log("User Banned");
      alert("User Banned");
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function roleColor(role) {
    var color;
    if (role === "staff") {
      color = "text-emerald-600 bg-emerald-200";
    }
    if (role === "admin") {
      color = "text-purple-600 bg-purple-200";
    }
    if (role === "student") {
      color = "text-blueGray-600 bg-blueGray-200";
    }
    if (role === "company") {
      color = "text-indigo-600 bg-indigo-200";
    }
    return color;
  }

  // Function to handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredData = searchQuery
    ? tableData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tableData;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
   
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded  " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
       
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="w-full bg-transparent border-collapse min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Username
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  role
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  actions
                </th>
              </tr>
            </thead>
            {currentItems.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-100 text-sm">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left flex items-center">
                  {user.username}
                </td>
                <td
                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 cursor-pointer text-sm"
                  onClick={() =>
                    (window.location.href = `mailto:${user.email}`)
                  }
                >
                  {user.email}
                </td>

                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <span
                    className={`text-xs font-semibold inline-block py-1 ${roleColor(
                      user.role
                    )} px-2 rounded-full uppercase last:mr-0 mr-1`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex justify-evenly">
                    <button onClick={() => toggleModalUser(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        className="w-5"
                      >
                        <path
                          fill="#5794ff"
                          d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                        />
                      </svg>
                    </button>
                    <button onClick={() => toggleModal(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="orange"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>

                    <button onClick={() => deleteUser(user._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>

                    <button onClick={() => banUser(user._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      {isModalOpen && (
        <EditUser user={selectedUser} onClose={() => setIsModalOpen(false)} />
      )}
      {isModalOpenUser && (
        <UserDetails
          user={selectedUser}
          onClose={() => isModalOpenUser(true)}
        />
      )}
      <nav className="flex justify-center align-middle">
        <ul className=" flex pl-0 rounded list-none flex-wrap">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 bg-white text-lightBlue-500"
            >
              <i className="fas fa-chevron-left -ml-px"></i>
            </button>
          </li>
          {tableData.length > 0 &&
            Array.from(
              { length: Math.ceil(tableData.length / itemsPerPage) },
              (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 bg-white text-lightBlue-500 ${
                      currentPage === index + 1
                        ? "bg-lightBlue-200 text-lightBlue-900"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentItems.length < itemsPerPage}
              className="first:ml-0 text-xs font-semibold mt-auto mb-0 flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 bg-white text-lightBlue-500"
            >
              <i className="fas fa-chevron-right -mr-px"></i>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};
