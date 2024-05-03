import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function SkillsTable({ color, searchQuery }) {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState("");

  const fetchData = async () => {
    const response = await axios.get("esprit-compass-backend.vercel.app/skills");
    console.log(response.data);
    if (response.data) {
      setSkills(response.data);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addSkill = async () => {
    try {
      const response = await axios.post("https://esprit-compass-backend.vercel.app/skills", {
        name: newSkill,
        description: description,
      });
      console.log("Skill Added");
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Skill added successfully!",
        showConfirmButton: false,
        timer: 1000,
      });
      setNewSkill("");
      setDescription("");
      fetchData();
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteSkill = async (skillId) => {
    try {
      const response = await axios.delete(
        `https://esprit-compass-backend.vercel.app/skills/deleteskill/${skillId}`
      );
      console.log("Skill Deleted");
      Swal.fire({
        position: "top",
        icon: "warning",
        title: "Skill deleted",
        showConfirmButton: false,
        timer: 1000,
      });
      fetchData();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredSkills = searchQuery
    ? skills.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : skills;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSkills.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the page numbers to display
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSkills.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Logic to display only 4 page numbers at a time
  const maxPageButtons = 4;
  const indexOfLastButton =
    currentPage + maxPageButtons <= pageNumbers.length
      ? currentPage + maxPageButtons
      : pageNumbers.length;

  const slicedPageNumbers = pageNumbers.slice(
    currentPage - 1,
    indexOfLastButton
  );

  return (
    <div className="">
      <button onClick={() => setShowForm(!showForm)}>
        {!showForm ? (
          <i
            class="fa-solid fa-square-plus fa-xl"
            style={{ color: "rgb(132,204,22)" }}
          ></i>
        ) : (
          <i
            class="fa-solid fa-arrow-left fa-xl"
            sstyle={{ color: "rgb(132,204,22)" }}
          ></i>
        )}
      </button>
      {showForm ? (
        <div className="mt-4">
          <h3 className="font-semibold text-lg text-center">Add Skill</h3>
          <div className="flex justify-center my-4 text-black">
            <input
              type="text"
              placeholder="Enter skill name"
              value={newSkill}
              className="ml-3 border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 ease-linear transition-all duration-150"
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter skill description"
              value={description}
              className="mx-3 border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 ease-linear transition-all duration-150"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={addSkill} className=" bg-lime-500 px-5 rounded ">
              <h1 className=" font-black text-white">add</h1>
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <h1 className="text-center font-black text-2xl mb-5">Skills</h1>

          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full my-6 shadow-lg rounded  " +
              (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
            }
          >
            <div className="block w-full overflow-x-auto">
              {/* Skills table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr className="bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                    <th className="  px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                      Name
                    </th>
                    <th className="px-6 * align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                      Description
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center ">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((skill) => (
                    <tr key={skill._id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {skill.name}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {skill.description}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
                        <button onClick={() => deleteSkill(skill._id)}>
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
              {slicedPageNumbers.map((pageNumber) => (
                <li key={pageNumber}>
                  <button
                    onClick={() => paginate(pageNumber)}
                    className={`first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-lightBlue-500 bg-white text-lightBlue-500 ${
                      currentPage === pageNumber
                        ? "bg-lightBlue-200 text-lightBlue-900"
                        : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                </li>
              ))}
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
      )}
    </div>
  );
}
