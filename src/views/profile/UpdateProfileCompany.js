import React, { useState, useEffect } from "react";
import "react-input-range/lib/css/index.css"; // Don't forget to import the styles
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
export default function UpdateProfileCompany({ onClose, onSubmit, companyData }) {
  const [showModal, setShowModal] = React.useState(true);
  const [token, setToken] = useState(localStorage.getItem("token")); 
  const [location, setlocation] = useState(companyData.location);
  const [secteurActivite, SetsecteurActivite] = useState(companyData.secteurActivite);
  const [descreption, setDescreption] = useState(companyData.descreption);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const param = useParams();
 
  // Déclaration des états pour les données de l'utilisateur

  const [user, setUser] = useState(companyData);
console.log(companyData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
  
  try {
    const response = await axios.put(`esprit-compass-backend.vercel.app/user/update-user/${companyData._id}`, user);
    console.log(response);
    if (response.status === 200) {
      setShowModal(false);
      if (onSubmit) {
        onSubmit({ ...user, _id: param.id });
      }
    } else {
      throw new Error(`Error updating user: ${response.data.message}`);
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

const handleInputChange = (e) => {
  setUser({
    ...user,
    [e.target.name]: e.target.value,
  });
  setErrors({
    ...errors,
    [e.target.name]: "",
  });
};

const handleLocationChange = (e) => {
  const { value } = e.target;
  setUser({
    ...user,
    location: value,
  });
  setErrors({
    ...errors,
    location: "",
  });
};

const handleEmailChange = (e) => {
  const { value } = e.target;
  setUser({
    ...user,
    email: value,
  });

  // Validation de l'e-mail
  const emailPattern = /\S+@\S+\.\S+/;
  if (!emailPattern.test(value)) {
    setErrors({
      ...errors,
      email: "Invalid email address",
    });
  } else {
    setErrors({
      ...errors,
      email: "",
    });
  }
};

const handleSelectChange = (e) => {
  const { value } = e.target;
  setUser({
    ...user,
    industry: value,
  });
  setErrors({
    ...errors,
    industry: "",
  });
};

const handlePhoneChange = (value) => {
  setUser({
    ...user,
    phone: value,
  });
  setErrors({
    ...errors,
    phone: "",
  });
};

const validateForm = () => {
  let errors = {};
  let isValid = true;

  if (!user.username.trim()) {
    errors.username = "Company name is required";
    isValid = false;
  }

  if (!user.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = "Invalid email address";
    isValid = false;
  }

  if (!user.industry) {
    errors.industry = "Sector of activity is required";
    isValid = false;
  }

  if (!user.location.trim()) {
    errors.location = "Location is required";
    isValid = false;
  }

  if (!user.description.trim()) {
    errors.description = "Description is required";
    isValid = false;
  }

  setErrors(errors);
  return isValid;
};

  // Continue with form submission

    const handleCancel = () => {
      onClose();
    };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="bg-white rounded-lg p-8 z-10 relative">
      <button onClick={onClose} className="absolute right-0 top-0 m-4">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
    Modify Company Profile
    </h2>
 
    
    <form onSubmit={handleSubmit}>
    <div className="px-6 mx-6  py-4 text-left">
    <div className="relative">
              <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="companyName">
                <i className="fa-solid fa-building"></i> Company name
              </label>
              <input
                name="username"
                value={user.username}
                onChange={handleInputChange}
                className={`border-0 bg-gray-100 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150 ${
                  errors.username ? "border-red-500" : ""
                }`}
              />
              {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
            </div>
          </div>
          <div className="px-6 mx-6  py-4 text-left">
  <div className="relative">
    <label
      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
      htmlFor="grid-password"
    >
      <i className="fa-solid fa-envelope"></i>
      {"  "} Email
    </label>
    <input
      type="email"
      value={user.email}
      onChange={handleEmailChange}
      className={`border-0 bg-gray-100 bg-gray-100 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150 ${
        errors.email ? "border-red-500" : ""
      }`}
    />
    {errors.email && (
      <p className="text-red-500 text-xs italic">{errors.email}</p>
    )}
  </div>
</div>

          <div className="px-6 mx-6  py-4 text-left">
          <div className="relative">
            
            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="secteurActivite">
              <i className="fa-solid fa-industry"></i>
              {"  "} Sector of activity
            </label>
            <select
             defaultValue={user.industry}
               onChange={ handleSelectChange}
              id="secteurActivite"
              name="secteurActivite"
              className="border-0 px-3 bg"
         
            >
              <option value="">Select</option>
              <option value="informatique_telecoms">IT / Telecoms</option>
              <option value="commerce_vente_distribution">Commerce / Vente / Distribution</option>
              <option value="banque_finance_assurances">Banking / Finance / Insurance</option>
              <option value="communication_publicite_media">Communication / Advertising / Media</option>
              <option value="autres">Others</option>
            </select>
          </div>
       </div>  
       <div className="px-6 mx-6 py-4 text-left">
  <div className="relative">
    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="adresse">
      <i className="fa-solid fa-location-dot"></i>
      {"  "} Location (Address)
    </label>
    <input
    defaultValue={user.location}
    onChange={handleLocationChange}
      type="adresse"
      className="border-0 bg-gray-100 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
    />
  </div>
</div>
<div className="px-6 mx-6  py-4 text-left">
  <div className="relative">
    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="description">
      <i className="fa-solid fa-earth-africa"></i> Description
    </label>
    
    <textarea
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                errors.descreption ? "border-red-500" : ""
              }`}
      name="description"
      value={user.description}
      onChange={handleInputChange}
      placeholder="Describe your company"
      
    />
  </div>
</div>
<div className="px-6 mx-6 py-4 text-left">
    <div className="relative">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        <i className="fa-solid fa-phone-volume"></i>
        {"  "} Téléphone
      </label>
      <div className="flex items-center">
      <IntlTelInput
  containerClassName="intl-tel-input"
  inputComponent={({ value, onChange }) => (
    <input
      value={value}
      onChange={onChange}
      type="tel"
      className="border-0 bg-gray-100 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
    />
  )}
  onChange={handlePhoneChange}
  defaultValue={user.phone}
  preferredCountries={[]}
  defaultCountry="tn"
  format
/>
      </div>
    </div>
  </div>
  <div className="text-center">
  <button type="submit" className="bg-red-800 text-white px-4 py-2 rounded-md border-2 border-red-800 mr-4">Submit</button>
  <button onClick={handleCancel} className="bg-red-800 text-white px-4 py-2 rounded-md border-2 border-red-800">Cancel</button>
            </div>
    </form>
  </div>
</div>
  );
}