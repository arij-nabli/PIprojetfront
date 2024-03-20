import Navbar from "components/Navbars/IndexNavbar.js";
import HashLoader from "react-spinners/HashLoader";
import React from "react";
import axios from "axios";
import companyphoto from "../../assets/img/mobiblanc.jpeg";

import { useState , useEffect} from "react";


export default function DetailsOffer() {
    const [jobTitle, setJobTitle] = useState("Junior Java Developer");
    const [companyemail, setCompanyEmail] = useState("bouzayeni@mobiblanc.com");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState(
    "Mobiblanc Tunisie"
  );
  const [nombre, setNombre] = useState("7");

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/getUserDataFromToken",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setName(response.data.user.username);
        setEmail(response.data.user.email);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

    
  return (
    <>
      {isLoading ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HashLoader
            color={"#BD2C43"}
            loading={isLoading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <Navbar className="mb-12" />
          <div className="shadow-lg mt-10 lg:col-span-2 px-8 lg:px-16 mx-4 lg:mx-16 py-4 flex flex-col lg:flex-row items-start lg:items-center">
    <img
        src={companyphoto}
        style={{ width: 200, height: 200 }}
        className="border-1 px-4 border-black mb-4 lg:mb-0 lg:mr-8"
        alt="logo company"
    />
    <div className="text-center lg:text-left">
        <h3 className="text-2xl lg:text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
            {jobTitle}
        </h3>
        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
            {companyName}
        </p>
    </div>
    <div className="ml-auto">
        <button className="p-3 text-white rounded-md mr-2 mb-3 mt-10" style={{ backgroundColor: "#BD2C43" }}>Apply Now</button>
        <p className="mb-4 text-lg font-semibold leading-relaxed text-blueGray-700">{nombre} application(s)</p>
        </div>
    </div>
    <div class="grid lg:grid-cols-4 sm:grid-cols-1 gap-6 mt-4 ml-16 mr-16">
        <div>
    <div className="shadow-lg p-5 lg:col-span-1 sm:col-span-full ml-4 sm:ml-0">
        <h6 className="mb-2 mt-2 text-lg font-semibold leading-relaxed text-blueGray-900">Informations</h6>
        <div className="flex flex-wrap">
            <div className="w-full ">
                <h1 className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800" style={{ color: "#BD2C43" }}>Localisation :</h1>
                <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">Tunisie - Tunis -Centre Urbain Nord</p>
                <h1 className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800" style={{ color: "#BD2C43" }}>Type of work : </h1>
                <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">Hybrid face-to-face and remote</p>
            </div>
            <div className="w-full ">
                <h1 className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800" style={{ color: "#BD2C43" }}>Contrat :</h1>
                <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">FREELANCE OR INDEPENDENT SERVICE PROVIDER</p>
                <h1 className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800" style={{ color: "#BD2C43" }}>Salary :</h1>
                <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">1000 - 2000 TND </p>
            </div>
        </div>
    </div>




    <div className="shadow-lg p-5  sm:col-span-full ml-4 sm:ml-0">
        <h6 className="mb-2 mt-2 text-lg font-semibold leading-relaxed text-blueGray-900">Key Words</h6>
        <div className="flex flex-wrap">
            <div className="w-full ">
                <h1 className="p-3 text-white rounded-md mr-2 mb-3 mt-10" style={{ backgroundColor: "#BD2C43" }}>PHP</h1>
                <h1 className="p-3 text-white rounded-md mr-2 mb-3 mt-10" style={{ backgroundColor: "#BD2C43" }}>iOS</h1>
                <h1 className="p-3 text-white rounded-md mr-2 mb-3 mt-10" style={{ backgroundColor: "#BD2C43" }}>Android</h1>
                <h1 className="p-3 text-white rounded-md mr-2 mb-3 mt-10" style={{ backgroundColor: "#BD2C43" }}>Data science</h1>
            </div>
            
        </div>
        </div>
    </div>



    <div className="shadow-lg p-5 lg:col-span-3 sm:col-span-full mb-8 mr-4 sm:mr-0">
        <h6 className="mb-8 mt-8 text-lg font-semibold leading-relaxed text-blueGray-700">About The Offer</h6>
        <p>Nous sommes la société Mobiblanc Tunisie située au centre urbain nord .Nous désirons avoir la possibilité de recruter des profils ayant effectués leurs études au sein de votre établissement avec des les différentes technologies tel que : 
 
 - PHP symfony ( avec minimum 5 ans d'expérience) 
 - iOS 
 - Android (java et kotlin)
 - Data science
 - IA.</p>
        <p className="mb-8 mt-8">Why do we use it?
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

        </p>
        <hr className="mb-8 mt-8"></hr>
        <h6 className="mb-8 mt-8 text-lg font-semibold leading-relaxed text-blueGray-700">Closing date for applications: 05/05/2024</h6>
        <hr className="mb-8 mt-8"></hr>
        <h6 className="mb-4 mt-6 text-lg font-semibold leading-relaxed text-blueGray-700">Added By :</h6>
        <div className="lg:col-span-2  py-2 flex flex-col lg:flex-row items-start lg:items-center">
        <img
            src={companyphoto}
            style={{ width: 75, height: 75 }}
            className="mt-5 mr-8 border-1 shadow rounded-full border-black"
            alt="Default"
          />
          <div className="text-center lg:text-left">
        
        <p className="mb-2 mt-5 text-lg font-semibold leading-relaxed text-blueGray-800">
            {companyName}
        </p>
        <h3 className=" leading-normal mb-4 text-blueGray-700">
            {companyemail}
        </h3>
    </div>
        </div>

        
    </div>
</div>


            
          </>
    )}
  </>
);}