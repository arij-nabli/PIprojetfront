import { React, useState } from "react";
import axios from "axios";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import ReactCountryFlagsSelect from "react-country-flags-select";

export default function CompanyRegister() {
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);
  const [descreption, setdescreption] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [logo, setLogo] = useState(null);
  const [country, setCountry] = useState("");
  const [selected, setSelected] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState([]);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [secteurActivite, setSecteurActivite] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [telephoneError, setTelephoneError] = useState("");
  const [website, setWebsite] = useState("");

  const [acceptedConditions, setAcceptedConditions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const selectCountry = (value) => {
    console.log(value);
    setSelected(value);
    setCountry(value);
  };
  const signUp = () => {
    if (!isFormValid()) {
      setErrorMessage('Please fill in all fields');
      return;
    }
   
    const companyData = {
      username: nomEntreprise,
      email: email,
      website: website,
      password: password,
      role: "company",
      industry: secteurActivite,
      description: descreption,
      phone: telephone,
      location: adresse,
    };
    console.log("Company Data:", companyData);
    axios.post('http://localhost:5000/auth/register', JSON.stringify(companyData), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response.data);
        setErrorMessage("Your Request will be validated by an admin.S")
      })
      .catch(error => {
        console.log(error)
        if(error.response.data.message === "User already exists")
        setErrorMessage("This company has already been registered")
      });
  };
  const handleConditionsChange = () => {
    setAcceptedConditions(!acceptedConditions);
  };

  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };

  const handlesetdescreption = (event) => {
    setdescreption(event.target.value);
  };

  const handleAdresseChange = (event) => {
    setAdresse(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event.target.value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };
  const handleActivityChanges = (event) => {
    setSecteurActivite(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  
    const errors = [];
    if (event.target.value.length < 8) {
      errors.push('Password must contain at least 8 characters');
    }
    if (!/[A-Z]/.test(event.target.value)) {
      errors.push('Password must contain an uppercase letter');
    }
    if (!/[a-z]/.test(event.target.value)) {
      errors.push('Password must contain a lowercase letter');
    }
    if (!/\d/.test(event.target.value)) {
      errors.push('Password must contain a number');
    }
    if (!/[!@#$%^&*]/.test(event.target.value)) {
      errors.push('Password must contain a special character');
    }
  
    setPasswordError(errors);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);

    if (event.target.value !== password) {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  };
  const handlenomEntrepriseChange = (event) => {
    setNomEntreprise(event.target.value);
  };

  const handleTelephoneChange = (e) => {
    const value = e.target.value;

    // Add any validation logic here
    if (value.trim() === "") {
      setTelephoneError("phone in valid ");
    } else {
      setTelephoneError("");
    }

    setTelephone(value);
  };

  const handlePhoneNumberChange = (status, value, countryData, number, id) => {
    // Assurez-vous que la valeur ne contient que des chiffres
    const numericValue = value.replace(/\D/g, "");
    setTelephone(numericValue);

    // Validation supplémentaire si nécessaire
    if (!/^\d+$/.test(numericValue)) {
      setTelephoneError(
        "The telephone number must contain only number."
      );
    } else {
      setTelephoneError("");
    }
  };

  const isFormValid = () => {
    return (
      email &&
      !emailError &&
      password &&
      passwordError.length === 0 &&
      confirmPassword &&
      !passwordMatchError &&
      nomEntreprise &&
      secteurActivite &&
      descreption &&
      adresse &&
      telephone&&
      website 
    );
  };
 
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h1 className="font-bold text-xl">Join us as a company</h1>
                </div>
                <hr className="border-b-1 border-blueGray-300" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <div className="flex flex-col lg:flex-row">
                    {/* Company Name on the Left */}
                    <div className="lg:w-1/2 lg:pr-5 mb-3">
                      <div className="relative">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="companyName"
                        >
                          <i className="fa-solid fa-building"></i>
                          {"  "} Company name
                        </label>
                        <input
                          onChange={handlenomEntrepriseChange}
                          className="border-0 bg-gray-100 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>

                    {/* Activity Sector on the Right */}
                    <div className="lg:w-1/2 lg:pl-5 mb-3">
                      <div className="relative">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="secteur_activite"
                        >
                          <i className="fa-solid fa-briefcase"></i> Activity
                          area
                        </label>
                        <select
                          onChange={handleActivityChanges}
                          id="secteur_activite"
                          name="secteur_activite"
                          className="border-0 px-3 bg-gray-100 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                        >
                          <option value="">Select</option>
                          <option value="informatique_telecoms">
                            IT / Telecoms
                          </option>
                          <option value="commerce_vente_distribution">
                            Commerce / Vente / Distribution
                          </option>
                          <option value="banque_finance_assurances">
                            Banking / Finance / Insurance
                          </option>
                          <option value="communication_publicite_media">
                            Communication / Advertising / Media
                          </option>
                          <option value="autres">Autres</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Email below them */}
                  <div className="lg:w-full mb-3">
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
                        value={email}
                        onChange={handleEmailChange}
                        className="border-0 bg-gray-100 bg-gray-100 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                      />
                      {emailError && (
                        <div className="flex items-center text-red-500 text-base mt-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-5 w-5 mr-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <p>{emailError}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between mb-3">
                      <div className="w-1/2 mr-3">
                        <label
                          className=" uppercase text-blueGray-600 text-xs  font-bold mb-3"
                          htmlFor="grid-password"
                        >
                          <i class="fa-solid fa-earth-africa"></i>
                          {"  "}Select your country
                        </label>
                        <ReactCountryFlagsSelect
                          selected={selected}
                          onSelect={(e) => selectCountry(e)}
                          searchable={true}
                          selectHeight={45}
                        />
                        
                      </div>
                    </div>
                   
                  <div className="flex flex-col lg:flex-row">
                    {/* Phone on the Left */}

                    <div className="lg:w-1/2 lg:pr-5 mb-3">
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
                            inputClassName="border-0 bg-gray-100 bg-gray-100 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                            
                             
                                type="tel"
                               
                                value={telephone}
                                onChange={handleTelephoneChange}
                            

                          
                            preferredCountries={[]}
                            defaultCountry="tn"
                            format
                            onPhoneNumberChange={handlePhoneNumberChange}
                          />
                        </div>
                        {telephoneError && (
                          <p className="text-red-500 text-xs mt-2">
                            {telephoneError}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Location (Address) on the Right */}
                    <div className="lg:w-1/2 lg:pl-5 mb-3">
                      <div className="relative">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-role"
                        >
                          <i className="fa-solid fa-location-dot"></i>
                          {"  "}
                          Location (Address)
                        </label>
                        <input
                          onChange={handleAdresseChange}
                          type="adresse"
                          className="border-0 bg-gray-100 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        <i className="fa-solid fa-earth-africa"></i>
                        {"  "}
                        Description
                      </label>
                      <input
                        type="text"
                        onChange={handlesetdescreption}
                        placeholder="Describe your company"
                        className="border-0 bg-gray-100 mb-3 mt-2 px-3 py-3 mr-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150 "
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="website"
                      >
                        <i className="fa-solid fa-link"></i>
                        {"  "}
                        Website
                      </label>
                      <input
                        type="url"
                        onChange={handleWebsiteChange}
                        placeholder="Website URL ex: https://EspriCompass.com"
                        className="border-0 bg-gray-100 mb-3 mt-2 px-3 py-3 mr-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 lg:pr-5 mb-3 flex">
                      <div className="relative w-full">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <i className="fa-solid fa-key"></i>
                          {"  "} Password
                        </label>
                        <div className="relative flex items-center">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            value={password}
                            onChange={handlePasswordChange}
                            className="border-0 bg-gray-100 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                          />
                          <i
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className={`fa-solid ${
                              passwordVisible ? "fa-eye-slash" : "fa-eye"
                            } absolute mr-3 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
                          />
                        </div>
                        

{passwordError.length > 0 && (
  <div className="text-red-500 text-xs mt-2">
    {passwordError.map((error, index) => (
      <p key={index}>{error}</p>
    ))}
  </div>
)}

                      </div>
                    </div>

                    <div className="lg:w-1/2 lg:pl-5 mb-3 flex">
                      <div className="relative w-full">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          <i className="fa-solid fa-lock"></i>
                          {"  "} Confirm Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          className="border-0 bg-gray-100 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                          disabled={!password || passwordError.length > 0} // Disable Confirm Password if Password is not filled or has errors
                        />
                        {passwordMatchError && (
                          <div className="flex items-center text-red-500 text-base mt-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="h-5 w-5 mr-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            <p>{passwordMatchError}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox bg-gray-100 border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear focus:ring-custom-red transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={handleShow}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                 
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => signUp()}
                    >
                      Create Account
                    </button>
                  </div>
                 
                  {errorMessage && errorMessage != "Your Request will be validated by an admin.S"?<div class="p-4 mb-4 flex justify-center relative text-sm text-red-800 rounded-lg bg-red-200 mt-5  dark:text-red-400" role="alert">
  <span class="font-medium"> <p style={{  color: 'red' }}>{errorMessage}</p></span>
</div>            : null   }
                      {errorMessage == "Your Request will be validated by an admin.S" ?
                       <div class="p-4 mt-4 mb-4 text-sm text-center text-green-800 rounded-lg bg-green-50 dark:text-green-700" role="alert">
                       <span class="font-medium ">{errorMessage}</span> 
                     </div> :
                        null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Privacy Policy for Our Website
                    </h3>
                    <div className="mt-2 text-left text-sm text-gray-500">
                      <h4 className="font-bold">1. Introduction</h4>
                      <p>
                        Welcome to our website. If you continue to browse and
                        use this website, you are agreeing to comply with our
                        privacy policy, which together with our terms of service
                        govern [Your Name]'s relationship with you in relation
                        to this website.
                      </p>

                      <h4 className="font-bold mt-4">
                        2. Information We Collect
                      </h4>
                      <p>We may collect the following information:</p>
                      <ul className="list-disc list-inside">
                        <li>Name and job title</li>
                        <li>Contact information including email address</li>
                        <li>
                          Demographic information such as postcode, preferences
                          and interests
                        </li>
                        <li>
                          Other information relevant to customer surveys and/or
                          offers
                        </li>
                      </ul>

                      {/* Add the rest of your privacy policy sections here */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleClose}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}