// Importez useState depuis react

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#BD2C43");
  const [emailSent, setEmailSent] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event.target.value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  // Fonction pour l'authentification
  const signIn = async () => {
    if (!email || !password) {
      setErrorMessage("Please fill in all fields correctly");
      return;
    }
    const userData = {
      email,
      email,
      password,
    };
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        userData
      );

      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      const role = response.data.role.role;
      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/profile", { replace: true });
      }

      setIsLoading(false);
      // Si l'authentification réussit, vous pouvez effectuer des actions supplémentaires ici
    } catch (error) {
      setIsLoading(false);
      console.error(error.response.data);
      if (error.response.status === 401) {
        setErrorMessage("Incorrect Password");
      } else if (error.response.status === 404) {
        setErrorMessage("User Not Found");
      }
      if (error.response.status === 403) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  // Fonction de gestion du changement de mot de passe
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage("Please type your email address");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/forgot-password",
        { email: email }
      );
      console.log(response.data);
      setEmailSent(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  // Vérifie si le formulaire est valide
  const isFormValid = () => {
    return email && !emailError && password;
  };
const googleSignIn = async () => { 
  window.open('http://localhost:5000/auth/google', '_self');

 }
  return (
    <>
      <div className="container mx-auto px-4 h-full ">
        <div className="flex content-center items-center justify-center  h-full">
          <div className="w-full lg:w-4/12 px-4 ">
            <div className="relative flex bg-white flex-col min-w-0 break-words w-full mb-2 shadow-lg rounded-lg  border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-sm font-bold">Sign up with</h6>
                </div>
                <div className="btn-wrapper text-center flex justify-center">
                  <button
                    className=" mr-4 bg-gray-100 active:bg-blueGray-50 text-blueGray-700 font-normal px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase  hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => googleSignIn()}
                  >
                    <img
                      alt="..."
                      className="w-5 "
                      src={require("assets/img/google.svg").default}
                    />
                  </button>
                  <button
                    className="bg-gray-100 mr-4 active:bg-blueGray-50 text-blueGray-700 font-normal px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase  hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=>  window.open('http://localhost:5000/auth/github', '_self')}
                  >
                    <img
                      alt="..."
                      className="w-5 "
                      src={require("assets/img/github.svg").default}
                    />
                  </button>
                  <button
                    className="bg-gray-100 mr-4 active:bg-blueGray-50 text-blueGray-700 font-normal px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase  hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 "
                      src={require("assets/img/fcbk.svg").default}
                    />
                  </button>
                  <button
                    className="bg-gray-100 active:bg-blueGray-50 text-blueGray-700 font-normal px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase  hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 "
                      src={require("assets/img/linkedin.svg").default}
                    />
                  </button>
                </div>
                <hr className="border-b-1 mt-3  border-blueGray-300" />
              </div>
              <div className="flex-auto  lg:px-10 py-10 pt-0">
                <div className=" text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="Hash-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      required
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
                    )}
                  </div>
                  {/* Champ Mot de passe */}
                  <div className="relative w-full mb-2">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="Hash-password"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        required
                        onChange={handlePasswordChange}
                        className="bg-gray-100 border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                      />
                      <i
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className={`fa-solid ${
                          passwordVisible ? "fa-eye-slash" : "fa-eye"
                        } absolute mr-3 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer `}
                      />
                    </div>
                  </div>
                  {/* Bouton Se connecter */}
                  <div className="text-center mt-6">
                    <button
                      className=" bg-blueGray-800 text-white  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => signIn()}
                    >
                      Login
                    </button>
                  </div>
                  {/* Affichage du message d'erreur */}
                  {errorMessage && !emailSent && (
                    <div
                      class="p-4 mb-4 flex justify-center  relative text-sm text-red-800 rounded-lg bg-red-200 mt-5  dark:text-red-400"
                      role="alert"
                    >
                      <span class="font-medium">
                        {" "}
                        <p style={{ color: "red" }}>{errorMessage}</p>
                      </span>
                    </div>
                  )}
                  {emailSent && (
                    <div
                      class="p-4 mb-4 flex justify-center  relative text-sm text-green-800 rounded-lg bg-green-200 mt-5  dark:text-green-400"
                      role="alert"
                    >
                      <span class="font-medium">
                        {" "}
                        <p style={{ color: "green" }}>
                          A recovery email has been sent{" "}
                        </p>
                      </span>
                    </div>
                  )}
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={() => handleForgotPassword()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register/user" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
