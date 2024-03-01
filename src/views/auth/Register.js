import{ React,useState,useEffect} from "react";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
export default function Register() {
  const [userName, setuserName] = useState('');
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
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
  const signUp = () => {
    if(!isFormValid()){
      setErrorMessage('Please fill in all fields');
      return;
    }
    const userData = {
      username:userName,
      role,
      country,
      region,
      email,
      password,
    };
    axios.post('http://localhost:5000/auth/register', userData)
      .then(response => {
        console.log(response.data);
        setErrorMessage("User registered successfully! Please check your email to verify your account.")
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        }
      });
  };
  
  const selectRegion = (value) => {
    setRegion(value);
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
      setPasswordMatchError('Passwords do not match');
    } else {
      setPasswordMatchError(''); 
    }
  };
  const handleuserNameChange = (event) => {
    setuserName(event.target.value);
  };
  
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  
  const isFormValid = () => {
    return email && !emailError && password && passwordError.length === 0 && confirmPassword && !passwordMatchError&&  userName && role && country && region ;
  };
  const responseMessage = (response) => {
    console.log(response);
};
const [ user, setUser ] = useState([]);
const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        
                        setProfile(res.data);
                        console.log(profile);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

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
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center flex justify-center">
                 
               
                <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => login()}
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
                        onChange={handleuserNameChange} // Add this line

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
{emailError && 
  <div className="flex items-center text-red-500 text-base mt-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
    <p>{emailError}</p>
  </div>
}    </div>
    
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
 <div className="text-red-500 text-base mt-2 space-y-2">
 {passwordError.map((error, index) => (
   <div key={index} className="flex items-center">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
        {'  '} Confirm Password
      </label>
      <input
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
      />
{passwordMatchError && 
  <div className="flex items-center text-red-500 text-base mt-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
    <p>{passwordMatchError}</p>
  </div>
}    </div>
    
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
                  <div className="flex justify-between">
                    <div className="w-1/2 mr-3">
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
                      </div>
                      <div className="w-1/2 ml-3">
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
                 {errorMessage && errorMessage != "User registered successfully! Please check your email to verify your account."?<div class="p-4 mb-4 flex justify-center relative text-sm text-red-800 rounded-lg bg-red-200 mt-5  dark:text-red-400" role="alert">
  <span class="font-medium"> <p style={{  color: 'red' }}>{errorMessage}</p></span>
</div>            : null   }
                      {errorMessage == "User registered successfully! Please check your email to verify your account." ?
                       <div class="p-4 mt-4 mb-4 text-sm text-center text-green-800 rounded-lg bg-green-50 bg-green-200 dark:text-green-700" role="alert">
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
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Privacy Policy for Our Website
              </h3>
              <div className="mt-2 text-left text-sm text-gray-500">
                <h4 className="font-bold">1. Introduction</h4>
                <p>Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with our privacy policy, which together with our terms of service govern [Your Name]'s relationship with you in relation to this website.</p>

                <h4 className="font-bold mt-4">2. Information We Collect</h4>
                <p>We may collect the following information:</p>
                <ul className="list-disc list-inside">
                  <li>Name and job title</li>
                  <li>Contact information including email address</li>
                  <li>Demographic information such as postcode, preferences and interests</li>
                  <li>Other information relevant to customer surveys and/or offers</li>
                </ul>

                {/* Add the rest of your privacy policy sections here */}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button onClick={handleClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
