import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddOffer = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const handleSkillInputChange = async (event) => {
    setSkillInput(event.target.value);
    if (event.target.value.length > 0) {
      const response = await fetch(
        `http://localhost:5000/skills/search?start=${event.target.value}`
      );
      const skills = await response.json();
      setSuggestedSkills(skills.map((skill) => skill));
    } else {
      setSuggestedSkills([]); // Clear the suggestions when the input is empty
    }
  };

  const handleSkillClick = async (skill) => {
    setSkillInput("");
    setSkills([...skills, skill]);
    setSuggestedSkills([]);
  };
  const handleSkillDelete = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (!title) {
      validationErrors.title = "Title is required";
    }
    if (!description) {
      validationErrors.description = "Description is required";
    }
    if (!minSalary) {
      validationErrors.minSalary = "Minimum Salary is required";
    }
    if (!maxSalary) {
      validationErrors.maxSalary = "Maximum Salary is required";
    }
    if (minSalary >= maxSalary) {
      validationErrors.minSalary =
        "Minimum Salary must be smaller than Maximum Salary";
    }
    if (!startDate) {
      validationErrors.startDate = "Start Date is required";
    }
    if (!endDate) {
      validationErrors.endDate = "End Date is required";
    }
    if (startDate >= endDate) {
      validationErrors.startDate = "Start Date must be before End Date";
    }
    if (!location) {
      validationErrors.location = "Location is required";
    }
    if (!type) {
      validationErrors.type = "Type is required";
    }
    if (!category) {
      validationErrors.category = "Category is required";
    }
    if (skills.length === 0) {
      validationErrors.skills = "At least one skill is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const offerData = {
      title,
      description,
      provider: "6608f7f8ac60ba2adcd178d1",
      salary_range: { min: minSalary, max: maxSalary },
      start_date: startDate,
      end_date: endDate,
      location,
      type,
      category,
      benefits,
      is_active: isActive,
      requirements: skills,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/offers",
        offerData
      );
      console.log(response.data);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Offer added successfully!",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="bg-gray-100 h-max py-3 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-center">Add Offer</h1>

      <div className="flex flex-row items-center justify-center min-h-screen ">
        <form
          className="w-full max-w-2xl  mx-auto bg-white p-8 border border-gray-300"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                errors.title ? "border-red-500" : ""
              }`}
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">{errors.title}</p>
            )}
          </div>
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description:
            </label>
            <textarea
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                errors.description ? "border-red-500" : ""
              }`}
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {errors.description}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="minSalary"
              >
                Minimum Salary:
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors.minSalary ? "border-red-500" : ""
                }`}
                type="number"
                id="minSalary"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
              />
              {errors.minSalary && (
                <p className="text-red-500 text-xs italic">
                  {errors.minSalary}
                </p>
              )}
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="maxSalary"
              >
                Maximum Salary:
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors.maxSalary ? "border-red-500" : ""
                }`}
                type="number"
                id="maxSalary"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
              />
              {errors.maxSalary && (
                <p className="text-red-500 text-xs italic">
                  {errors.maxSalary}
                </p>
              )}
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="startDate"
              >
                Start Date:
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors.startDate ? "border-red-500" : ""
                }`}
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs italic">
                  {errors.startDate}
                </p>
              )}
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="endDate"
              >
                End Date:
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors.endDate ? "border-red-500" : ""
                }`}
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {errors.endDate && (
                <p className="text-red-500 text-xs italic">{errors.endDate}</p>
              )}
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="location"
              >
                Location:
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors.location ? "border-red-500" : ""
                }`}
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {errors.location && (
                <p className="text-red-500 text-xs italic">{errors.location}</p>
              )}
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="type"
              >
                Type:
              </label>
              <select
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors.type ? "border-red-500" : ""
                }`}
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="remote">Remote</option>
                <option value="full-time">Full-time</option>
                <option value="hybrid">Hybrid</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-xs italic">{errors.type}</p>
              )}
            </div>
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="category"
              >
                Category:
              </label>
              <select
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors.category ? "border-red-500" : ""
                }`}
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="internship">Internship</option>
                <option value="job">Job</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs italic">{errors.category}</p>
              )}
            </div>
            <div >
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="skills"
              >
                Skills:
              </label>
              <input
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors.skills ? "border-red-500" : ""
                }`}
                type="text"
                id="skills"
                value={skillInput}
                onChange={(e) => handleSkillInputChange(e)}
              />
              {skillInput ? (
                <div className="bg-white text-left mx-1  z-10 rounded-md shadow-lg">
                  {suggestedSkills.map((skill, index) => (
                    <div
                      key={index}
                      onClick={() => handleSkillClick(skill)}
                      className="hover:bg-blue-200 px-4 cursor-pointer"
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              ) : null}
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="rounded-md bg-gray-300 text-left px-4 py-2 my-1 flex justify-between"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid",
                    padding: "10px",
                    margin: "10px",
                  }}
                >
                  <span>{skill.name}</span>
                  <button onClick={() => handleSkillDelete(skill)}>
                    <i class="fa-solid fa-xmark p-1 hover:text-red-600 rounded-full "></i>
                  </button>
                </div>
              ))}
              {errors.skills && (
                <p className="text-red-500 text-xs italic">{errors.skills}</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <button
              className="w-full shadow bg-custom-red hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOffer;
