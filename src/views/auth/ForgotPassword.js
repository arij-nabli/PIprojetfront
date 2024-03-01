import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(''); // Add this line
  const [serverError, setserverError] = useState(''); 
  const [serverSuccess,setserverSuccess] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    // Create a URLSearchParams object with the query string of the current URL
    const params = new URLSearchParams(window.location.search);
  
    // Get the token parameter
    const token = params.get('token');
  
    // Display the token in the console
    console.log('Token:', token);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if(!newPassword || !confirmNewPassword){
      setserverError(["Please fill in all fields correctly"]);
      return
    }
    // Get the token parameter
    const token = params.get('token');
    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      setMessage(["Passwords do not match."]);
      return;
    }
  
    // Make a POST request to the auth/reset-password route
    axios.post('http://localhost:5000/auth/reset-password', { newPassword,token })
      .then(response => {
        console.log(response.data);
        setserverSuccess("Your password has been reset successfully.");
        setTimeout(() => {
          navigate('/auth/login');

        }, 3000);
     
      })
      .catch((error) => {
        console.error('Error:', error);
        setserverError("error");
      });
  };
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  
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
  
    setMessage(errors);
  }; 
  const handleConfirmPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);

    if (event.target.value !== newPassword) {
      setPasswordMatchError('Passwords do not match');
    } else {
      setPasswordMatchError(''); 
    }
  };
  
  return (
    <div className="container mx-auto px-4  h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex p-4 flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-custom-gray border-0">
            <h2 className="text-center mb-5">Forgot Password</h2>
            <form onSubmit={handleSubmit}>
          
            <div className="relative w-full mb-2">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="Hash-password"
                    >
                     New Password
                    </label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        value={newPassword}
                        required
                        onChange={handleNewPasswordChange}
                        className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                      />
                      <i 
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className={`fa-solid ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} absolute mr-3 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer `}
                      />
                    </div>
                  </div>
                  
                  {message.length > 0 && (
 <div className="text-red-500 text-base mt-2 space-y-2">
{message.map((error, index) => (
   <div key={index} className="flex items-center ">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
     </svg>
     <p>{error}</p>
   </div>
 ))}
</div>
)}
              <div className="relative w-full mb-2">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="confirm-new-password"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={confirmNewPassword}
                  required
                  onChange={(e) => handleConfirmPasswordChange(e)}
                  className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                />
                  <i 
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className={`fa-solid ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} absolute mr-3 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer `}
                      />
                      </div>
                      {passwordMatchError && 
  <div className="flex items-center text-red-500 text-base mt-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
    <p>{passwordMatchError}</p>
  </div>
} 
              </div>
              <div className="text-center mt-6">
                    <button
                      className=" bg-blueGray-800 text-white  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      disabled={message.length > 0 || passwordMatchError}
                      onClick={(e) => handleSubmit(e)}
                    >
                      Reset Password
                    </button>
                  </div>
                  {serverError && !serverSuccess && <div class="p-4 mb-4 flex justify-center  relative text-sm text-red-800 rounded-lg bg-red-200 mt-5  dark:text-red-400" role="alert">
  <span class="font-medium"> <p style={{  color: 'red' }}>{serverError}</p></span>
</div>          }
                {serverSuccess && <div class="p-4 mb-4 flex justify-center  relative text-sm text-green-800 rounded-lg bg-green-200 mt-5  dark:text-green-400" role="alert">
                <span class="font-medium"> <p style={{  color: 'green' }}>{serverSuccess}</p></span>
                    </div>}
            </form>
 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;