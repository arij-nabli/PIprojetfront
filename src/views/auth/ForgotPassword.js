import React, { useState } from "react";

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle password reset
    setMessage("Password reset instructions have been sent to your email.");
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
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                />
                  <i 
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className={`fa-solid ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} absolute mr-3 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer `}
                      />
                      </div>
              </div>
              <div className="text-center mt-6">
                    <button
                      className=" bg-blueGray-800 text-white  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    
                    >
                      Reset Password
                    </button>
                  </div>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;