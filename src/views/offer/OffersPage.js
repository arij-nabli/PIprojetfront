import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "components/Navbars/IndexNavbar.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import OfferCard from "components/Cards/OfferCard";
import HashLoader from "react-spinners/HashLoader";
import feriel from "../../assets/img/feriel.jpg";
import { Link } from "react-router-dom";
import companyphoto from "../../assets/img/mobiblanc.jpeg";

export default function OffersPage() {
  
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState("Feriel BHK");
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState(
    "Full-Stack web developer with 3 years of experience in building web applications."
  );
  //si role=student haka sinon alumni looking for job offer
  const [status, setStatus] = useState(
    "A student looking for an internship."
  );
  const [email, setEmail] = useState("");
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/offers/getall");
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
          {token ? <IndexNavbar /> : <AuthNavbar />}


         



  <div class="mx-auto grid lg:grid-cols-4 sm:grid-cols-2 gap-6 mt-4">
    <div className="shadow-lg p-5 lg:col-span-1">

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
                {offers.map((offer, index) => (
                  <OfferCard
                    key={index}
                    companyphoto={companyphoto}
                    jobTitle={offer.jobTitle}
                    companyName={offer.companyName}
                    description={offer.description}
                    //viewMoreLink={offer.viewMoreLink}
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
