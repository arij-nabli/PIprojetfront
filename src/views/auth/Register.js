import{ React,useState} from "react";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [role, setRole] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState([]);
  const [passwordMatchError, setPasswordMatchError] = useState(''); // Add this line

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    // Simple validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event.target.value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };
  const selectCountry = (value) => {
    setCountry(value);
  };

  const selectRegion = (value) => {
    setRegion(value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  
    const errors = [];
    if (event.target.value.length < 6) {
      errors.push('Password must contain at least 6 characters');
    }
    if (!/[A-Z]/.test(event.target.value)) {
      errors.push('Password must contain an uppercase letter');
    }
    if (!/\d/.test(event.target.value)) {
      errors.push('Password must contain a number');
    }
  
    setPasswordError(errors);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);

    if (event.target.value !== password) {
      setPasswordMatchError('Passwords do not match');
    } else {
      setPasswordMatchError(''); 
    }
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  
  const isFormValid = () => {
    return email && !emailError && password && passwordError.length === 0 && confirmPassword && !passwordMatchError&&  firstName && role && country && region ;
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-custom-gray border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/github.svg").default}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div>
                <hr className="border-b-1 border-blueGray-300" />
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
                        {'  '} Full name
                    </label>
                    <input
                        onChange={handleFirstNameChange} // Add this line

                      className="border-0 px-3 py-3   rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150 "
                    
                    />
                  </div>

                  <div className="relative w-full mb-3">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        <i className="fa-solid fa-envelope"></i>
        {'  '} Email
      </label>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
      />
      {emailError && <p className="text-red-500 text-xs mt-2">{emailError}</p>}
    </div>
    
    <div className="relative w-full mb-2">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        <i className="fa-solid fa-key"></i>
        {'  '} Password
      </label>
      <div className="relative">
      <input
        type={passwordVisible ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
      />
   
   
    <i 
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className={`fa-solid ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} absolute mr-3 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer `}
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

    <div className="relative  w-full mb-2">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        <i className="fa-solid fa-lock"></i>
        {'  '} Confirm Password
      </label>
      <input
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
      />
      {passwordMatchError && <p className="text-red-500 text-xs mt-2">{passwordMatchError}</p>} 
    </div>
    
                    <div className="relative  mt-4 mb-3">

                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-role"
                      >
                                            <i class="fa-solid fa-graduation-cap"></i>

                                            {'  '}Role
                     
                      </label>
                      <select
                        id="grid-role"
                        onChange={handleRoleChange} // Add this line
                        defaultValue=""
                        className="border-0 px-3 py-3 mr-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                      >
                          <option value="">Select role</option> 

                        <option value="student">Student</option>
                        <option value="alumni">Alumni</option>
                        <option value="staff">Staff</option>
                      </select>
                    </div>
                  <div>
                  <label
                      className=" uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      <i class="fa-solid fa-earth-africa"></i>
                        {'  '}Select your country
                    </label>
                    <CountryDropdown
                      value={country}
                      onChange={(val) => selectCountry(val)} 
                      className="border-0 mb-3 mt-2 px-3 py-3 mr-3  rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red  focus:ring w-full ease-linear transition-all duration-150 "
                      />
                         <label
                      className=" uppercase text-blueGray-600 text-xs font-bold mb-4"
                      htmlFor="grid-password"
                    >
                      <i class="fa-solid fa-mountain-sun"></i>
                        {'  '}Select your region
                    </label>
                    <RegionDropdown
                      country={country}
                      value={region}
                      onChange={(val) => selectRegion(val)}
                      className="border-0 mb-3 mt-2 px-3 py-3 mr-3  rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red  focus:ring w-full ease-linear transition-all duration-150 "
                      />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear focus:ring-custom-red transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
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
                      disabled={!isFormValid()}
                      onClick={() => alert('Form submitted')}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
