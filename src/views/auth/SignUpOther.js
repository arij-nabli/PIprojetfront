import{ React,useState,useEffect} from "react";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function SignUpOther(route) {
  const [role, setRole] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const params = useLocation()

  const selectCountry = (value) => {
    setCountry(value);
  };
  const signUp = () => {
    if(!isFormValid()){
      setErrorMessage('Please fill in all fields');
      return;
    }
    const userData = {
      username:params.state.name,
      role,
      country,
      region,
      email:params.state.email,
      password:"Aa123456**",
      verified:"accepted"
    };
    axios.post('http://localhost:5000/auth/register', userData)
      .then(response => {
        console.log(response.data);
        setErrorMessage("User registered successfully!")
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

  
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  
  const isFormValid = () => {
    return    role && country && region ;
  };

  

    useEffect(
        () => {
            console.log(params.state);
        
        },
       
    );

    // log out function to log the user out of google and set the profile array to null
  


  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-sm font-bold">
                    Sign up
                  </h6>
                </div>
              
                <hr className="border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            
                <form>   
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

    </>
  );
}
