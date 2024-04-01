/*import Navbar from "components/Navbars/IndexNavbar.js";
import HashLoader from "react-spinners/HashLoader";
import React from "react";
import axios from "axios";
import companyphoto from "../../assets/img/mobiblanc.jpeg";
import { useParams } from 'react-router-dom';
import { useState , useEffect} from "react";


export default function DetailsOffer() {
    const [companyemail, setCompanyEmail] = useState("bouzayeni@mobiblanc.com");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [offer, setOffer] = useState([]);

    const [companyName, setCompanyName] = useState(
    "Mobiblanc Tunisie"
  );
      const [companyLocalisation , setCompanyLocalisation] = useState("Tunisie - Tunis -Centre Urbain Nord")
  const [nombre, setNombre] = useState("7");

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(true);
    
    const { id , description , title  } = useParams();
  // Fetch offer details using the ID
  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/offers/get/${id}`);
        console.log(`${id}`);
        console.log(response.data);
  
        // Check if response.data is null or empty
        if (!response.data) {
          console.error("Error: Response data is null or empty.");
          setIsLoading(false);
          return;
        }
  
        // Check if response.data contains the expected properties
        if (!offer) {
          console.error("Error: Offer details are incomplete.");
          setIsLoading(false);
          return;
        }
  
        // Set the offer details
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching offer details:", error);
        setIsLoading(false);
      }
    };
  
    fetchOfferDetails();
  }, [id]);
  console.log(offer);
  
  
  

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
                <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">{companyLocalisation}</p>
                <h1 className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800" style={{ color: "#BD2C43" }}>Type of work : </h1>
                <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">Hybrid face-to-face and remote</p>
            </div>
            <div className="w-full ">
                <h1 className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800" style={{ color: "#BD2C43" }}>Contrat :</h1>
                <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">FREELANCE OR INDEPENDENT SERVICE PROVIDER</p>
                <h1 className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800" style={{ color: "#BD2C43" }}>Salary :</h1>
                <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600"></p>
 
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
        <div>
        
        
        </div>
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
*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailsOffer = () => {
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/offers/get/${id}`);
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching offer details:", error);
        setIsLoading(false);
      }
    };

    fetchOfferDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!offer) {
    return <div>Offer not found</div>;
  }

  return (
    <div>
      <h1>{offer.title}</h1>
      <p>{offer.description}</p>
      {/* Render other offer details here */}
    </div>
  );
};

export default DetailsOffer;









/*import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import OfferCard from "components/Cards/OfferCard";
import HashLoader from "react-spinners/HashLoader";
import feriel from "../../assets/img/feriel.jpg";
import { Link } from "react-router-dom";
import companyphoto from "../../assets/img/mobiblanc.jpeg";
import CompanyNavbar from "components/Navbars/CompanyNavbar";
import Auth from "layouts/Auth";
export default function OffersPage() {
  const [searchLocation, setSearchLocation] = useState('');

  const handleLocationChange = (e) => {
    setSearchLocation(e.target.value);
  };

  
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState("Feriel BHK");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [description, setDescription] = useState(
    "Full-Stack web developer with 3 years of experience in building web applications."
  );
  //si role=student haka sinon alumni looking for job offer
  const [status, setStatus] = useState(
    "A student looking for an internship."
  );
  const [email, setEmail] = useState("");
  const [offers, setOffers] = useState([]);
  const filteredOffers = offers.filter(offer => {
    return offer.location.toLowerCase().includes(searchLocation.toLowerCase());
  });
  

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/offers/getall");
        console.log(response.data);
        setOffers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);
 
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
        setUser(response.data.user);
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
  const [nomEntreprise, setNomEntreprise] = useState('');
  const [dateOffre, setDateOffre] = useState('');
  const [typeOffre, setTypeOffre] = useState('');
  const [secteurActivite, setSecteurActivite] = useState('');
  const [lieuOffre, setLieuOffre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez gérer la soumission du formulaire ici
    // Par exemple, vous pouvez envoyer les données à un serveur ou les traiter localement
  };

  const handleReset = () => {
    setNomEntreprise('');
    setDateOffre('');
    setTypeOffre('');
    setSecteurActivite('');
    setLieuOffre('');
  };

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
{
  !user.role ?<AuthNavbar /> : 
  (user.role === 'company' ? <CompanyNavbar /> :  <IndexNavbar id={user._id}/>)
}
  <div class="mx-auto grid lg:grid-cols-4 sm:grid-cols-2 gap-6 mt-4">
    <div className="shadow-lg p-5 lg:col-span-1 ">

      <div className="flex flex-col bg-white">
        <div className="flex items-center justify-center mt-10 w-full">
          <img
            src={feriel}
            style={{ width: 200, height: 200 }}
            className="mt-5 border-1 shadow rounded-full border-black"
            alt="Default"
          />
        </div>

        <div className="mx-auto mt-2">
          <h3 className="text-4xl text-center font-semibold leading-normal mb-2 text-blueGray-700">
            {name}
          </h3>
          <p className="mb-4 text-lg  leading-relaxed text-blueGray-700">
                {description}
              </p>
          
        </div>

        <div className="mt-10  py-10 border-t border-blueGray-200 text-center">
          <div className="flex flex-wrap justify-center ">
          <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/profile"
                >
                  <i className="fas fa-user-circle text-blueGray-800 mr-2 text-sm"></i>{" "}
                  My profile 
                </Link>
            
          </div>
          <div className="flex flex-wrap  justify-center">
            <div className="w-full font-bold lg:w-9/12 px-4 mb-6 flex flex-col">
            <Link
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  to="/"
                >
                <i className="fas fa-clipboard-list text-blueGray-700 mr-2 text-sm"></i>{" "}
                  My applications
                </Link>            
                </div>
            
          </div>
        </div>
     
      </div>
    </div>



            

    <div class="p-5 lg:col-span-2">
              <div>
                {filteredOffers.map((offer, index) => (
                  <OfferCard
                    key={index}
                    //companyphoto={offer.photoofprovider}
                    companyphoto={companyphoto}
                    jobTitle={offer.title}
                    companyName={offer.companyName}
                    Category={offer.category}
                    description={offer.description}

                    viewMoreLink={`/offer-details/${offer._id}`}
                  />
                ))}
              </div>
    </div>












    <div class="shadow-lg p-5 lg:col-span-1 ">
    <form onSubmit={handleSubmit}>
      <div class="px-6 mx-6  my-4 py-4">
      
        <div >
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#BD2C43" }} >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l-6-6M15 11l6-6M15 11H9" />
            </svg>
            <h2 className="text-lg  font-semibold" style={{ color: "#BD2C43" }}>Filter</h2>
          </div>
          </div>
          
            <div className="mb-4">
              <label className="block mb-1" htmlFor="nom-entreprise">Company Name</label>
              <input type="text" id="nom-entreprise" value={nomEntreprise} onChange={(e) => setNomEntreprise(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="date-offre">Offer Date:</label>
              <input type="date" id="date-offre" value={dateOffre} onChange={(e) => setDateOffre(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="type-offre">Type:</label>
              <select id="type-offre" value={typeOffre} onChange={(e) => setTypeOffre(e.target.value)}>
                <option value="">Select...</option>
                <option value="offre">Job</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="secteur-activite">Activity Area:</label>
              <select id="secteur-activite" value={secteurActivite} onChange={(e) => setSecteurActivite(e.target.value)}>
                <option value="">Select...</option>
                <option value="IT">IT</option>
                <option value="Business">Business</option>
                <option value="Civil">Civil</option>
                <option value="Electromecanique">Electromecanique</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="lieu-offre">Location</label>
              <input type="text" id="lieu-offre" value={lieuOffre} onChange={(e) => setLieuOffre(e.target.value)} />
            </div>
            <div>
              <button type="button" onClick={handleReset} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Reset</button>
            </div>
            </div>
            </form>
          </div>
        </div>
        

      </>
    )}
  </>
);}
*/
