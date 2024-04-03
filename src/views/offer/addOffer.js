import React, { useState , useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddOffer = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState("");
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [payment, setPayment] = useState("unpaid"); // New state for Payment
  const [contrat, setContrat] = useState(""); // New state for Contrat
  const [user, setUser] = useState(null);
  const [offers, setOffers] = useState([]);

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
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          'http://localhost:5000/auth/getUserDataFromToken',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setUser(response.data.user);

        if (response.data.user && response.data.user._id) {
          const offersResponse = await axios.get(
            `http://localhost:5000/offers/getByCompany/${response.data.user._id}`
          );
          console.log(offersResponse.data);
          setOffers(offersResponse.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
    if (!area) {
      validationErrors.area = "Area is required";
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
      provider : user._id,
      salary_range: { min: minSalary, max: maxSalary },
      start_date: startDate,
      end_date: endDate,
      location,
      type,
      category,
      benefits,
      area,
      is_active: isActive,
      requirements: skills,
      payment, // Include payment in offer data
      contrat,
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
                htmlFor="type"
              >
                Area:
              </label>
              <select
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                  errors.type ? "border-red-500" : ""
                }`}
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">Select Area</option>
                <option value="IT">IT</option>
                <option value="Civil">Civil</option>
                <option value="Business">Business</option>
                <option value="Electromecanique">Electromecanique</option>
              </select>
              {errors.area && (
                <p className="text-red-500 text-xs italic">{errors.area}</p>
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
                <option value="internship">internship</option>
                <option value="job">job</option>
              </select>
              {category === "internship" && (
            <div>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="payment"
              >
                Payment:
              </label>
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="payment"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          )}
          {category === "job" && (
  <div>
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
        htmlFor="contrat"
      >
        Contrat:
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        type="text"
        id="contrat"
        value={contrat}
        onChange={(e) => setContrat(e.target.value)}
      />
    </div>
  </div>
)}

  
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
