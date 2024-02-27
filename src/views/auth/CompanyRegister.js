import{ React,useState} from "react";
import axios from "axios";
export default function CompanyRegister() {
  const [ descreption, setdescreption] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [logo, setLogo] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState([]);
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [nomEntreprise, setNomEntreprise] = useState('');
  const [secteurActivite, setSecteurActivite] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
const [telephoneError, setTelephoneError] = useState('');

const signUp = () => {
  const companyData = {
    username:nomEntreprise,
    email:email,
   
    password:password,
    role:"company",
    industry:secteurActivite,
    description:descreption,
     phone:telephone,
     location:adresse
  };
  console.log("Company Data:", companyData);
  axios.post('http://localhost:5000/auth/register', JSON.stringify(companyData), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
    console.log(error)
    });
};





  const  handlesetdescreption= (event) => {
    setdescreption(event.target.value);
  };

  const handleAdresseChange = (event) => {
    setAdresse(event.target.value);
  };
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event.target.value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };
  const handleActivityChanges = (event) => {
    setSecteurActivite(event.target.value);
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
  const handlenomEntrepriseChange= (event) => {
    setNomEntreprise(event.target.value);
  };
  const handleTelephoneChange = (event) => {
    const inputValue = event.target.value;
  
    // Replace all non-numeric characters with an empty string
    const numericValue = inputValue.replace(/\D/g, '');
  
    // Update the state with the numeric value
    setTelephone(numericValue);
  }


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
      telephone
    );
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
         
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-custom-gray border-0">
              <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                  <h1 className="font-bold text-xl">
                    Join us as a company
                  </h1>
                </div>
              
                <hr className="border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
               
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                    <i class="fa-solid fa-building"></i>
                        {'  '} Company name
                    </label>
                    <input
                      onChange={handlenomEntrepriseChange}
                      className="border-0 px-3 py-3   rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150 "
                    
                    />
                  </div>

                  <div className="relative w-full mb-3">
                  <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      <i class="fa-solid fa-envelope"></i>
                        {'  '} Email
                    </label>
                    <input
                     type="email"
                     value={email}
                     onChange={handleEmailChange}
                      className="border-0 px-3 py-3   rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150 "
                    
                    />
                    {emailError && <p className="text-red-500 text-xs mt-2">{emailError}</p>}
                  </div>
                  <div class="relative w-full mb-3">
  <label
    for="secteur_activite"
    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
  >
    <i class="fa-solid fa-briefcase"></i> {' '} 
Activity area
  </label>
  <select
  onChange={handleActivityChanges}
    id="secteur_activite"
    name="secteur_activite"
    class="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
  >
    <option value="">Select</option>
    <option value="informatique_telecoms">
IT / Telecoms</option>
    <option value="commerce_vente_distribution">Commerce / Sales / Distribution</option>
    <option value="banque_finance_assurances">Banking / Finance / Insurance</option>
    <option value="communication_publicite_media">Communication / Advertising / Media</option>
    <option value="autres">Autres</option>
  </select>
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
                                           <i class="fa-solid fa-location-dot"></i>

                                            {'  '}
                                            Location (Address)
                    
                      </label>
                      <input
                      onchange={handleAdresseChange}
                      type="adresse"
                      className="border-0 px-3 py-3   rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150 "
                    
                    />
                    </div>
                  <div>
                  <label
                      className=" uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      <i class="fa-solid fa-earth-africa"></i>
                        {'  '} 
                        Descreption
                    </label>
                    <input
                    
                      type="descreption"
                      onChange={handlesetdescreption} 
                      className="border-0 mb-3 mt-2 px-3 py-3 mr-3  rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red  focus:ring w-full ease-linear transition-all duration-150 "
                      />
                        
                  </div>
                  <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    <i className="fa-solid fa-phone-volume"></i>
                    {'  '}Téléphone
                  </label>
                  <div className="flex items-center">
                    <div >
                    
                    </div>
                    <input
                      type="tel"
                      value={telephone}
                      onChange={handleTelephoneChange}
                      className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                  {telephoneError && <p className="text-red-500 text-xs mt-2">{telephoneError}</p>}
                </div>      
            
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              <i className="fa-solid fa-image"></i>
              {'  '}Logo/Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:border-0 focus:ring-custom-red focus:ring w-full ease-linear transition-all duration-150"
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
                      I accept {" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                         the conditions of use
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
                      Save
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