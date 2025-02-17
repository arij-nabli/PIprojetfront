import { React, useState, useEffect } from "react";
//import {ReactFlagsSelect} from "react-flags-select";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import ReactCountryFlagsSelect from "react-country-flags-select";

import axios from "axios";
import GoogleLogin from "react-google-login";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import FacebookLogin from "@greatsumini/react-facebook-login";
import ReactFlagsSelect from "react-flags-select";
import ReCAPTCHA from "react-google-recaptcha";
export default function Register() {
  const [userName, setuserName] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState([]);
  const [passwordMatchError, setPasswordMatchError] = useState(""); // Add this line
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selected, setSelected] = useState("");
  const [graduationDate, setGraduationDate] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [job_title, setjob_title] = useState("");
  const [selectRoleError, setSelectRoleError] = useState("");
  const GITHUB_CLIENT_ID = "075cb9a7d1740345dd4c";
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Simple validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event.target.value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };
  
  const onRecaptchaChange = (value) => {
    console.log(value); 
    if (value) { 
      
      axios
        .post("https://esprit-compass-backend.vercel.app/auth/submit", { recaptchaToken: value }) 
        .then((response) => {
          console.log(response.data); 
        })
        .catch((error) => {
          console.error("Error submitting reCAPTCHA:", error); 
          // Handle error (optional)
        });
    }
  };
  
  const signUp = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    const userData = {
      username: userName,
      role,
      country,
      email,
      password,
    };
    axios
      .post("https://esprit-compass-backend.vercel.app/auth/register", userData)
      .then((response) => {
        console.log(response.data);
        setErrorMessage(
          "User registered successfully! Please check your email to verify your account."
        );
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        }
      });
  };
  const selectCountry = (value) => {
    console.log(value);
    setSelected(value);
    setCountry(value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    const errors = [];
    if (event.target.value.length < 8) {
      errors.push("Password must contain at least 8 characters");
    }
    if (!/[A-Z]/.test(event.target.value)) {
      errors.push("Password must contain an uppercase letter");
    }
    if (!/[a-z]/.test(event.target.value)) {
      errors.push("Password must contain a lowercase letter");
    }
    if (!/\d/.test(event.target.value)) {
      errors.push("Password must contain a number");
    }
    if (!/[!@#$%^&*]/.test(event.target.value)) {
      errors.push("Password must contain a special character");
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
  const handleuserNameChange = (event) => {
    setuserName(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const isFormValid = () => {
    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    console.log(userName);
    console.log(role);
    console.log(country);
    return (
      email &&
      !emailError &&
      password &&
      passwordError.length === 0 &&
      confirmPassword &&
      !passwordMatchError &&
      userName &&
      role &&
      country
    );
  };

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);



  const loginGithub = async (code) => {
    try {
      const response = await axios.post(
        "https://esprit-compass-backend.vercel.app/auth/github-cors-by-pass",
        { code }
      );
      console.log(response.data);
      if (response.data.email) {
        navigate("/auth/register-other/user", { state: response.data });
      }
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };
  const handleGitHubCallback = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    if (code) {
      loginGithub(code);
    }
  };
  const { linkedInLogin } = useLinkedIn({
    clientId: "78e3zjnwmivy4i",
    redirectUri: `https://espritcompass.vercel.app/auth/register/user`,
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  // This function starts the GitHub authentication process
  function startGithubAuth() {
    setSelectRoleError("");
    if(role) {
        // After the role has been sent, start the GitHub authentication process
        window.location.href = `https://esprit-compass-backend.vercel.app/auth/github?role=${role}`;
      }
     else {
      setSelectRoleError("Please select a role");
    }
  }
  const startGoogleAuth = () => {
    setSelectRoleError("");
    if(role) {
        // After the role has been sent, start the Google authentication process
        window.location.href = `https://esprit-compass-backend.vercel.app/auth/google?role=${role}`;
      }
     else {
      setSelectRoleError("Please select a role");
    }
  
  }
  useEffect(() => {
    handleGitHubCallback();

    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          navigate("/auth/register-other/user", { state: res.data });
          if (res.data) {
            setProfile(res.data);
            console.log(profile);
          }
        })
        .catch((err) => console.log("google error", err));
    }
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-sm font-bold">Sign up with</h6>
                </div>
                <div className="btn-wrapper text-center flex justify-center">
                  <button
                    className="bg-gray-100 mr-4 active:bg-blueGray-50 text-blueGray-700 font-normal px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>startGoogleAuth()}
                  >
                    <img
                      alt="..."
                      className="w-5 "
                      src={require("assets/img/google.svg").default}
                    />
                  </button>

                  <button
                    className="bg-gray-100 mr-4 active:bg-blueGray-50 text-blueGray-700 font-normal px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>startGithubAuth()}
                  >
                    <img
                      alt="..."
                      className="w-5 "
                      src={require("assets/img/github.svg").default}
                    />
                  </button>

                  <FacebookLogin
                    appId="2594710990698655"
                    onSuccess={(response) => {
                      console.log("Login Success!", response);
                    }}
                    onFail={(error) => {
                      console.log("Login Failed!", error);
                    }}
                    onProfileSuccess={(response) => {
                      console.log("Get Profile Success!", response);
                    }}
                    className="bg-gray-100 mr-4 active:bg-blueGray-50 text-blueGray-700 font-normal px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                  >
                    {" "}
                    <img
                      alt="..."
                      className="w-5 "
                      src={require("assets/img/fcbk.svg").default}
                    />
                  </FacebookLogin>
                  <button
                    className="bg-gray-100 active:bg-blueGray-50 text-blueGray-700 font-normal px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 "
                      src={require("assets/img/linkedin.svg").default}
                      onClick={linkedInLogin}
                    />
                  </button>
                </div>
                <hr className="border-b-1 mt-3 border-blueGray-300" />
                {selectRoleError&&  <div
                        class="p-4 mb-4 flex justify-center relative text-sm text-red-800 rounded-lg bg-red-200 mt-5  dark:text-red-400"
                        role="alert"
                      >
                        <span class="font-medium">
                          {" "}
                          <p style={{ color: "red" }}>{selectRoleError}</p>
                        </span>
                      </div>}
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className=" text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      <i class="fa-solid fa-user"></i>
                      {"  "} Full name
                    </label>
                    <input
                      onChange={handleuserNameChange} // Add this line
                      className="border-0 px-3 py-3 bg-gray-100  rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150 "
                    />
                  </div>

                  <div className="relative w-full mb-3">
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
                      className="bg-gray-100 border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
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
                    )}{" "}
                  </div>

                  <div className="relative w-full mb-2">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      <i className="fa-solid fa-key"></i>
                      {"  "} Password
                    </label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        className="border-0 px-3 bg-gray-100 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                      />

                      <i
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className={`fa-solid ${
                          passwordVisible ? "fa-eye-slash" : "fa-eye"
                        } absolute mr-3 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer `}
                      />
                    </div>
                    {passwordError.length > 0 && (
                      <div className="text-red-500 text-base mt-2 space-y-2">
                        {passwordError.map((error, index) => (
                          <div key={index} className="flex items-center">
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
                            <p>{error}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative  w-full mb-2">
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
                    )}{" "}
                  </div>

                  <div className="relative  mt-4 mb-3">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-role"
                      >
                        <i class="fa-solid fa-graduation-cap"></i>
                        {"  "}Role
                      </label>
                      <select
                        id="grid-role"
                        onChange={handleRoleChange} // Add this line
                        defaultValue=""
                        className="border-0 bg-gray-100 px-3 py-3 mr-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option value="">Select role</option>
                        <option value="student">Student</option>
                        <option value="alumni">Alumni</option>
                        <option value="staff">Staff</option>
                      </select>
                    </div>

                    {role === "alumni" && (
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-graduation-date"
                        >
                          Graduation Date
                        </label>
                        <input
                          type="date"
                          id="grid-graduation-date"
                          value={graduationDate}
                          onChange={(e) => setGraduationDate(e.target.value)}
                          className="border-0 px-3 bg-gray-100 py-3 mb-3 mr-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <label
                          className="block uppercase mt-3 text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-current-position"
                        >
                          Current Position
                        </label>
                        <input
                          type="text"
                          id="grid-current-position"
                          value={currentPosition}
                          onChange={(e) => setCurrentPosition(e.target.value)}
                          className="border-0 bg-gray-100 px-3 py-3 mr-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    )}

                    {role === "staff" && (
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-current-position"
                        >
                          Job
                        </label>
                        <input
                          type="text"
                          id="grid-current-position"
                          value={job_title}
                          onChange={(e) => setjob_title(e.target.value)}
                          className="border-0 bg-gray-100 px-3 py-3 mr-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    )}
                    <div className="flex justify-between">
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

                    <div>
                      <label className="inline-flex items-center cursor-pointer mt-4">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox bg-gray-100 border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear focus:ring-custom-red transition-all duration-150"
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          I agree with the{" "}
                          <a
                            href="#pablo"
                            className="text-lightBlue-500 "
                            onClick={handleShow}
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>

                    <div className="text-center mt-5">
                      <ReCAPTCHA
                        className="mb-4 mt-5 self-center"
                        sitekey="6Ldrc4kpAAAAAMtAXLvqZSR6xz4UQpGKP9HI4md4"
                        onChange={(value) => onRecaptchaChange(value)}
                      />
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                        onClick={(e) => signUp(e)}
                      >
                        Create Account
                      </button>
                    </div>
                    {errorMessage &&
                    errorMessage !=
                      "User registered successfully! Please check your email to verify your account." ? (
                      <div
                        class="p-4 mb-4 flex justify-center relative text-sm text-red-800 rounded-lg bg-red-200 mt-5  dark:text-red-400"
                        role="alert"
                      >
                        <span class="font-medium">
                          {" "}
                          <p style={{ color: "red" }}>{errorMessage}</p>
                        </span>
                      </div>
                    ) : null}
                    {errorMessage ==
                    "User registered successfully! Please check your email to verify your account." ? (
                      <div
                        class="p-4 mt-4 mb-4 text-sm text-center text-green-800 rounded-lg bg-green-50 dark:text-green-700"
                        role="alert"
                      >
                        <span class="font-medium ">{errorMessage}</span>
                      </div>
                    ) : null}
                  </div>
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
            <div className="inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
