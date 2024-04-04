import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
      } else if (role === "company") {
        navigate("/company/profile", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
      setIsLoading(false);
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
      if (error.response.status === 405) {
        setErrorMessage(
          "User is banned. Please contact the administrator for more information."
        );
      }
    }
  };

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

  const isFormValid = () => {
    return email && !emailError && password;
  };

  const googleSignIn = async () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="text-center mb-6">
              <h6 className="text-sm font-bold">Sign in with</h6>
            </div>
            <div className="flex justify-center mb-6">
              {/* Social media sign-in buttons */}
            </div>
            <hr className="border-b-1 border-blueGray-300 mb-6" />
            <form>
              <div className="mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="Hash-password">Email</label>
                <input type="email" value={email} required onChange={handleEmailChange} className="bg-gray-100 border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150" />
                {emailError && (
                  <div className="flex items-center text-red-500 text-sm mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    <p>{emailError}</p>
                  </div>
                )}
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="Hash-password">Password</label>
                <div className="relative">
                  <input type={passwordVisible ? "text" : "password"} value={password} required onChange={handlePasswordChange} className="bg-gray-100 border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150" />
                  <i onClick={() => setPasswordVisible(!passwordVisible)} className={`fa-solid ${passwordVisible ? "fa-eye-slash" : "fa-eye"} absolute mr-3 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer `} />
                </div>
              </div>
              <div className="text-center mt-6">
                <button className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150" type="button" onClick={() => signIn()}>Login</button>
              </div>
              {errorMessage && !emailSent && (
                <div className="p-4 mb-4 flex justify-center relative text-sm text-red-800 rounded-lg bg-red-200 mt-5 dark:text-red-400" role="alert">
                  <span className="font-medium"> <p style={{ color: "red" }}>{errorMessage}</p></span>
                </div>
              )}
              {emailSent && (
                <div className="p-4 mb-4 flex justify-center relative text-sm text-green-800 rounded-lg bg-green-200 mt-5 dark:text-green-400" role="alert">
                  <span className="font-medium"> <p style={{ color: "green" }}>A recovery email has been sent </p></span>
                </div>
              )}
            </form>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a href="#pablo" onClick={() => handleForgotPassword()} className="text-blueGray-200"><small>Forgot password?</small></a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register/user" className="text-blueGray-200"><small>Create new account</small></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
