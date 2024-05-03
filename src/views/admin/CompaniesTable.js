import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CompanyDetailsModal from "components/modals/CompanyDetailsModal";
import HeaderStats from "components/Headers/HeaderStats";
import Swal from "sweetalert2";

export default function CompaniesTable({ color, searchQuery,onNumCompaniesChange}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenUser, setIsModalOpenUser] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
    const [tableData, setTableData] = useState([]);
    const [userTable, setUserTable] = useState([]);
 
    const toggleModalUser = (index) => {
        const companyIndex = indexOfFirstItem + index;
        setSelectedCompany(tableData[companyIndex]);
        setSelectedUser(userTable[companyIndex]);       
        setIsModalOpenUser(!isModalOpenUser);
    };

    const fetchData = async () => {
        const response = await axios.get("esprit-compass-backend.vercel.app/admin/companiespending");
        setTableData(response.data.pendingCompanies);
        setUserTable(response.data.users);
        onNumCompaniesChange(response.data.pendingCompanies.length);

    };

    const acceptCompany = async (companyId) => {
        try {
            const res = await axios.put(
                `esprit-compass-backend.vercel.app/admin/acceptcompany/${companyId}`
            );
            console.log("Company Accepted");
            Swal.fire({
              position: "top",
              icon: "success",
              title: "Company accepted successfully!",
              showConfirmButton: false,
              timer: 1000
            });
           fetchData()
           onNumCompaniesChange(tableData.length-1)

        } catch (err) {
            console.error(err.message);
        }
    };

    const refuseCompany = async (companyId) => {
        try {
            const res = await axios.put(
                `esprit-compass-backend.vercel.app/admin/refusecompany/${companyId}`
            );
            console.log("Company Refused");
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Company refused successfully!",
              showConfirmButton: false,
              timer: 1000
            });
            fetchData()
            onNumCompaniesChange(tableData.length-1)
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
      <div className="">
         <h1 className="text-center font-black text-2xl mb-5">Pending Companies</h1>
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded  " +
            (color === "light" ? "bg-white" : "bg-custom-red text-white")
          }
        >
     
          <div className="block w-full overflow-x-auto">
            {/* Companies table */}
            <table className="items-center w-full bg-transparent border-collapse pb-10">
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
                    Name
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Industry
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Email
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              {currentItems.map((company, index) => (
                <tr key={company._id} className="hover:bg-gray-100 text-sm">
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    {company.name}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {company.industry}
                  </td>
                  <td
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer"
                    onClick={() =>
                      (window.location.href = `mailto:${userTable[index].email}`)
                    }
                  >
                    {userTable[index].email}
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

                      <button onClick={() => acceptCompany(company._id)}>
                        <i
                          class="fa-regular fa-circle-check fa-xl"
                          style={{ color: "lime" }}
                        ></i>
                      </button>
                      <button onClick={() => refuseCompany(company._id)}>
                        <i
                          class="fa-regular fa-circle-xmark fa-xl"
                          style={{ color: "red" }}
                        ></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
        
          </div>
          
        </div>
       
        <CompanyDetailsModal
          isOpen={isModalOpenUser}
          closeModal={toggleModalUser}
          company={selectedCompany}
          user={selectedUser}
        />
 <nav className="flex justify-center align-middle bg-tr">
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
      </div>
    );
}