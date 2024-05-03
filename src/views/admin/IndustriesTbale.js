import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import HeaderStats from "components/Headers/HeaderStats";
import Swal from 'sweetalert2'

export default function IndustriesTable({ color, searchQuery }) {
    const [industries, setIndustries] = useState([]);
    const [newIndustry, setNewIndustry] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
    const [showForm, setShowForm] = useState(false);
 
    const fetchData = async () => {
        const response = await axios.get("https://esprit-compass-backend.vercel.app/industries");
        console.log(response.data);
        if (response.data) {
            setIndustries(response.data);
        }
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const addIndustry = async () => {
        try {
            const response = await axios.post("https://esprit-compass-backend.vercel.app/industries", {
                name: newIndustry,
                companies: [],
            });
            console.log("Industry Added");
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Industry added successfully!",
                showConfirmButton: false,
                timer: 1000
              });
            setNewIndustry("");
            fetchData();
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteIndustry = async (industryId) => {
        try {
            const response = await axios.delete(
                `https://esprit-compass-backend.vercel.app/industries/${industryId}`
            );
            console.log("Industry Deleted");
            Swal.fire({
                position: "top",
                icon: "warning",
                title: "Industry Deleted",
                showConfirmButton: false,
                timer: 1000
              });
            fetchData();
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredIndustries = searchQuery
        ? industries.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        : industries;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredIndustries.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <div className="">
        <button 
            onClick={() => setShowForm(!showForm)} 
        >
            { !showForm? <i class="fa-solid fa-square-plus fa-xl" style={{color:"rgb(132,204,22)"}}></i>:<i class="fa-solid fa-arrow-left fa-xl " style={{color:"rgb(132,204,22)"}}></i>}
        </button>
        {showForm ? (
            <div className="mt-4">
                <h3 className="font-semibold text-lg text-center">
                    Add Industry
                </h3>
                <div className="flex justify-center my-4 text-black">
                    <input
                        type="text"
                        placeholder="Enter industry name"
                        value={newIndustry}
                        className="ml-3  border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0  ease-linear transition-all duration-150"
                        onChange={(e) => setNewIndustry(e.target.value)}
                    />
                <button onClick={addIndustry} className=" bg-lime-500 px-5 rounded ml-3">
            <h1  className=" font-black text-white">add</h1>
          </button>
                </div>
            </div>
        ) : <div className="">
        <h1 className="text-center font-black text-2xl mb-5">Industries</h1>


<div
className={
 "relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded  " +
 (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
}
>
<div className="rounded-t mb-0 px-4 py-3  ">
 <div className="flex flex-wrap items-center ">
     <div className="relative w-full px-4 max-w-full flex-grow flex-1">
         <h3
             className={
                 "font-semibold text-lg " +
                 (color === "light" ? "text-blueGray-700" : "text-white")
             }
         >
             Industries
         </h3>
     </div>
 </div>
</div>
<div className="block w-full overflow-x-auto">
 {/* Industries table */}
 <table className="items-center w-full bg-transparent border-collapse">
     <thead>
         <tr className="bg-blueGray-50 text-blueGray-500 border-blueGray-100">
             <th className="  px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                 Name
             </th>
             <th className="px-6 * align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center ">
                 Actions
             </th>
         </tr>
     </thead>
     <tbody>
         {currentItems.map((industry) => (
             <tr key={industry._id}>
                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                     {industry.name}
                 </td>
                 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                     <button onClick={() => deleteIndustry(industry._id)}>
                         <i
                             class="fa-solid fa-trash-can fa-xl"
                             style={{ color: "red" }}
                         ></i>
                     </button>
                 </td>
             </tr>
         ))}
     </tbody>
 </table>
</div>
</div>
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
 {industries.length > 0 &&
     Array.from(
         { length: Math.ceil(industries.length / itemsPerPage) },
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
</div>}
        {/* Rest of your component */}
    </div>
        
    );
}