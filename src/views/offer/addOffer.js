import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, json } from "react-router-dom";
import { BeatLoader } from "react-spinners";
const AddOffer = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState("");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
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
  const [skillsTable,setSkillsTable]=useState({})
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [payment, setPayment] = useState("unpaid"); // New state for Payment
  const [contrat, setContrat] = useState(""); // New state for Contrat
  const [user, setUser] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [offers, setOffers] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [offersTable,setOffersTable]= useState([])
  const [pdfError,setPdfError]=useState("")
  const handleSkillInputChange = async (event) => {
    setSkillInput(event.target.value);
    if (event.target.value.length > 0) {
      const response = await fetch(
        `https://esprit-compass-backend.vercel.app/skills/search?start=${event.target.value}`
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
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          'https://esprit-compass-backend.vercel.app/auth/getUserDataFromToken',
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
            `https://esprit-compass-backend.vercel.app/offers/getByCompany/${response.data.user._id}`
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
    if (!closeDate) {
      validationErrors.closeDate = "Close Date is required";
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
      provider: user._id,
      salary_range: { min: minSalary, max: maxSalary },
      close_date: closeDate,
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
        "https://esprit-compass-backend.vercel.app/offers",
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
  const getDataFromPdf = async (file) => {
    console.log(file);
      setLoadingData(true);
     
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(
          "http://localhost:5000/offers/getByPDF",
          formData
        );
     
        setLoadingData(false);
        console.log(response.data);
        console.log(typeof response.data);
        setOffersTable(response.data.jsonObject)
        let t = {};

        response.data.jsonObject.forEach(offer => {
          response.data.skillsTable[offer.id].forEach(array => {
            array.forEach(skill => {
              if (!t[offer.id]) {
                t[offer.id] = [];
              }
              t[offer.id].push(skill);
            });
          });
        });
        console.log(t)
        setSkillsTable(t)
        // setTitle(response.data.title);
        // setDescription(response.da ta.description);
        // setStartDate(response.data.startDate);
        // setEndDate(response.data.endDate);
        // setCloseDate(response.data.closeDate);
        // setLocation(response.data.location);
        // setType(response.data.type);
        // setArea(response.data.area);
        // setCategory(response.data.category);
        // setSkills(response.data.skills);
        // setPayment(response.data.payment);
        // setContrat(response.data.contrat);
        // setMinSalary(response.data.minSalary);
        // setMaxSalary(response.data.maxSalary);
      } catch (error) {
        console.error(error);
        setPdfError("error extracting data please try again")
        setLoadingData(false);

      }
  }
  const handleSumbitPFEBOOK=async(offer,e)=>{
    e.preventDefault()
const newOffer={
  title:offer.title,
  description:offer.description,
  provider: user._id,
  close_date: offer.closeDate,
  start_date: offer.startDate,
  end_date: offer.endDate,
  location:offer.location,
  type:offer.type,
  category:offer.category,
  benefits,
  area:offer.area,
  is_active: isActive,
  requirements: skillsTable[offer.id],
}
    console.log(newOffer)
    try {
      const response = await axios.post(
        "http://localhost:5000/offers",newOffer
        
      );
      console.log(response.data);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Offer added successfully!",
        showConfirmButton: false,
        timer: 1000,
      });
      setOffersTable(offersTable.filter(o => o.id !== offer.id))
    } catch (error) {
      console.error(error);
      // Handle error
    }
  }
  const clickSkill = (skill,offer)=>{
       setSkillsTable({
      ...skillsTable,
      [offer.id]: [...skillsTable[offer.id], skill]
    })
    setSkillInput("")
  }
  return (
    
    <div className="bg-gray-100 h-max py-3 sm:px-6 lg:px-8 flex flex-col">
   {loadingData &&
  <div className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center">
    <div className="bg-white flex flex-col justify-center rounded-lg p-8 shadow-xl">
      <span className="text-center  font-extrabold mx-auto mb-4 text-xl">extracting data </span>
    <BeatLoader
                color={"#BD2C43"}
                loading={loadingData}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
    </div>
  
  </div>
}
      <h1 className=" text-3xl font-bold text-center">Add Offer</h1>
      <input
        type="file"
        className="hidden"
        id="dropzone-file"
        accept=".pdf"
        onChangeCapture={(e) => {
          getDataFromPdf(e.target.files[0]);	
        }}
      />
   { offersTable.length == 0 ?  <div class="flex flex-col items-center justify-center w-full ">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center mb-1  cursor-pointer p-4 hover:text-white
        hover:bg-bray-800  hover:border-gray-500 hover:bg-gray-600 hover:rounded-lg "
        >
            <p class=" text-sm " >
              upload PDF
            </p>
      
        </label>
        {pdfError && <div className="text-red-600 mb-3 text-xl">
        {pdfError}
          </div>}
      </div>:<h2 className="text-center text-xl mb-2">
        detected <span className=" text-green-600">{offersTable.length} </span>offers please add the missing fields
    
        </h2 >}
   { offersTable.length > 0 ? 
    offersTable.map(offer=>{
   return(   <div key={offer.id} className="flex flex-row items-center justify-center min-h-screen ">

      <form
        className="w-full mb-3 max-w-2xl flex flex-col  mx-auto bg-white p-8 border border-gray-300"
        onSubmit={(e)=>handleSumbitPFEBOOK(offer,e)}
      > 
          <button className="justify-self-center border-2 mx-auto px-4 border-black hover:bg-red-400 bg-red-600 mb-3   text-white p-1 rounded-md text-center" onClick={()=>{
    setOffersTable(offersTable.filter(o => o.id !== offer.id))
}}>delete offer</button>
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
            value={offer.title} 
            onChange={(e) =>
              setOffersTable((prevOffersTable) =>
                prevOffersTable.map((o) =>
                  o.id === offer.id ? { ...o, title: e.target.value } : o
                )
              )
            }
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
            value={offer.description} 
            onChange={(e) =>
              setOffersTable((prevOffersTable) =>
                prevOffersTable.map((o) =>
                  o.id === offer.id ? { ...o, description: e.target.value } : o
                )
              )
            }
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs italic">
              {errors.description}
            </p>
          )}
        </div>
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="closeDate"
          >
            Close Date For Applying:
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
              errors.closeDate ? "border-red-500" : ""
            }`}
            type="date"
            id="closeDate"
            value={offer.closeDate} 
            onChange={(e) =>
              setOffersTable((prevOffersTable) =>
                prevOffersTable.map((o) =>
                  o.id === offer.id ? { ...o, closeDate: e.target.value } : o
                )
              )
            }
          />
          {errors.closeDate && (
            <p className="text-red-500 text-xs italic">{errors.closeDate}</p>
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
              value={offer.startDate} 
              onChange={(e) =>
                setOffersTable((prevOffersTable) =>
                  prevOffersTable.map((o) =>
                    o.id === offer.id ? { ...o, startDate: e.target.value } : o
                  )
                )
              }
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
              value={offer.endDate} 
              onChange={(e) =>
                setOffersTable((prevOffersTable) =>
                  prevOffersTable.map((o) =>
                    o.id === offer.id ? { ...o, endDate: e.target.value } : o
                  )
                )
              }
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
              value={offer.location} 
              onChange={(e) =>
                setOffersTable((prevOffersTable) =>
                  prevOffersTable.map((o) =>
                    o.id === offer.id ? { ...o, location: e.target.value } : o
                  )
                )
              }
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
              value={offer.type} 
              onChange={(e) =>
                setOffersTable((prevOffersTable) =>
                  prevOffersTable.map((o) =>
                    o.id === offer.id ? { ...o, type: e.target.value } : o
                  )
                )
              }
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
              value={offer.area} 
              onChange={(e) =>
                setOffersTable((prevOffersTable) =>
                  prevOffersTable.map((o) =>
                    o.id === offer.id ? { ...o, area: e.target.value } : o
                  )
                )
              }
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
              className="flex  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="category"
            >
              Category:
            </label>
            <select
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border row rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                errors.category ? "border-red-500" : ""
              }`}
              id="category"
              value={offer.category} 
              onChange={(e) =>
                setOffersTable((prevOffersTable) =>
                  prevOffersTable.map((o) =>
                    o.id === offer.id ? { ...o, category: e.target.value } : o
                  )
                )
              }
            >
              <option value="">Select Category</option>
              <option value="internship">internship</option>
              <option value="job">job</option>
            </select>

            {errors.category && (
              <p className="text-red-500 text-xs italic">{errors.category}</p>
            )}
          </div>

          <div>
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
                    onClick={() => clickSkill(skill,offer)}
                    className="hover:bg-blue-200 px-4 cursor-pointer"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            ) : null}
            {skillsTable[offer.id] && skillsTable[offer.id].map((skill, index) => (
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
                <button onClick={() => {
      const updatedSkills = skillsTable[offer.id].filter(s => s.id !== skill.id);
      setSkillsTable({...skillsTable, [offer.id]: updatedSkills});
    }}>                  <i class="fa-solid fa-xmark p-1 hover:text-red-600 rounded-full "></i>
                </button>
              </div>
            ))}
            {errors.skills && (
              <p className="text-red-500 text-xs italic">{errors.skills}</p>
            )}
          </div>

          {category === "internship" && (
            <div>
              <label
                className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="payment"
              >
                Payment:
              </label>

              <select
                className="appearance-none flex w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="payment"
                value={offer.payment} 
            onChange={(e) =>
              setOffersTable((prevOffersTable) =>
                prevOffersTable.map((o) =>
                  o.id === offer.id ? { ...o, payment: e.target.value } : o
                )
              )
            }
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
              {category === "internship" && payment === "paid" && (
                <div>
                  <div>
                    <label
                      className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
                      value={offer.minSalary} 
                      onChange={(e) =>
                        setOffersTable((prevOffersTable) =>
                          prevOffersTable.map((o) =>
                            o.id === offer.id ? { ...o, minSalary: e.target.value } : o
                          )
                        )
                      }
                    />
                    {errors.minSalary && (
                      <p className="text-red-500 text-xs italic">
                        {errors.minSalary}
                      </p>
                    )}
                  </div>
                  <label
                    className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
                    value={offer.maxSalary} 
                    onChange={(e) =>
                      setOffersTable((prevOffersTable) =>
                        prevOffersTable.map((o) =>
                          o.id === offer.id ? { ...o, maxSalary: e.target.value } : o
                        )
                      )
                    }
                  />
                  {errors.maxSalary && (
                    <p className="text-red-500 text-xs italic">
                      {errors.maxSalary}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {category === "job" && (
            <div>
              <div>
                <label
                  className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
                  value={offer.minSalary} 
            onChange={(e) =>
              setOffersTable((prevOffersTable) =>
                prevOffersTable.map((o) =>
                  o.id === offer.id ? { ...o, minSalary: e.target.value } : o
                )
              )
            }
                />
                {errors.minSalary && (
                  <p className="text-red-500 text-xs italic">
                    {errors.minSalary}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
                  value={offer.maxSalary} 
                  onChange={(e) =>
                    setOffersTable((prevOffersTable) =>
                      prevOffersTable.map((o) =>
                        o.id === offer.id ? { ...o, maxSalary: e.target.value } : o
                      )
                    )
                  }
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
                  value={offer.contrat} 
                  onChange={(e) =>
                    setOffersTable((prevOffersTable) =>
                      prevOffersTable.map((o) =>
                        o.id === offer.id ? { ...o, contrat: e.target.value } : o
                      )
                    )
                  }
                />
              </div>
            </div>
          )}
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
    </div>)
    })
   
   
   :  <div className="flex flex-row items-center justify-center min-h-screen ">
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
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="closeDate"
            >
              Close Date For Applying:
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                errors.closeDate ? "border-red-500" : ""
              }`}
              type="date"
              id="closeDate"
              value={closeDate}
              onChange={(e) => setCloseDate(e.target.value)}
            />
            {errors.closeDate && (
              <p className="text-red-500 text-xs italic">{errors.closeDate}</p>
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
                className="flex  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="category"
              >
                Category:
              </label>
              <select
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border row rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
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

              {errors.category && (
                <p className="text-red-500 text-xs italic">{errors.category}</p>
              )}
            </div>

            <div>
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

            {category === "internship" && (
              <div>
                <label
                  className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="payment"
                >
                  Payment:
                </label>

                <select
                  className="appearance-none flex w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="payment"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
                {category === "internship" && payment === "paid" && (
                  <div>
                    <div>
                      <label
                        className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
                    <label
                      className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
                )}
              </div>
            )}

            {category === "job" && (
              <div>
                <div>
                  <label
                    className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
                    className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
      </div>}
    </div>
  );
};

export default AddOffer;
