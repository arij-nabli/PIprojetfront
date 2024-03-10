import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "components/Navbars/IndexNavbar.js";
import HashLoader from "react-spinners/HashLoader";
import feriel from "../assets/img/feriel.jpg";
export default function Offer() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState("Feriel BHK");
  const [country, setCountry] = useState("Tunisia");
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState(
    "Full-Stack web developer with 3 years of experience in building web applications."
  );
  const [jobLocation, setJobLocation] = useState("Ariana, Tunisia");
  const [email, setEmail] = useState("");
 
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
          <Navbar />

         



  <div class="mx-auto grid lg:grid-cols-4 sm:grid-cols-2 gap-6 mt-4">
    <div className="shadow-lg p-5 lg:col-span-1">

      <div className="flex flex-col bg-white">
        <div className="flex items-center justify-center w-full">
          <img
            src={feriel}
            style={{ width: 200, height: 200 }}
            className="mt-5 border-1 shadow rounded-full border-black"
            alt="Default"
          />
        </div>

        <div className="mx-auto mt-2">
          <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
            {name}
          </h3>
          <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
            <i
              style={{ color: "#BD2C43" }}
              className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
            ></i>{" "}
            {country}
          </div>
          <div className="mb-2 text-blueGray-600 mt-3">
            <i
              style={{ color: "#BD2C43" }}
              className="fas fa-briefcase mr-2 text-lg text-blueGray-400"
            ></i>
            {jobTitle}
          </div>
          <div className="mb-2 text-blueGray-600">
            <i
              style={{ color: "#BD2C43" }}
              className="fas fa-university mr-2 text-lg text-blueGray-400"
            ></i>
            {jobLocation}
          </div>
        </div>

        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4 flex flex-col">
              <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-5 lg:col-span-2">
      <div class="shadow-lg text-center mb-4 py-4">
        <i class="fas fa-laptop-code text-2xl text-blue-500"></i>
        <h3 class="text-xl py-2">Web Developer</h3>
        <p>Description : Stage PFE  Lorem ipsum dolor sit amet consectetur adipisicing .....</p>
        <div class="mt-2"><button className="px-3 mx-4 py-1  text-white rounded-md mr-2" style={{ backgroundColor: "#BD2C43" }}>Voir plus</button><button className="px-3 mx-4 py-1 bg-blue-500 text-white rounded-md mr-2">Postuler</button></div>
      </div>
      <div class="shadow-lg text-center mb-4 py-4">
        <i class="fas fa-laptop-code text-2xl text-blue-500"></i>
        <h3 class="text-xl py-2">Web Developer</h3>
        <p>Description : Stage PFE  Lorem ipsum dolor sit amet consectetur adipisicing .....</p>
        <div class="mt-2"><button className="px-3 mx-4 py-1  text-white rounded-md mr-2" style={{ backgroundColor: "#BD2C43" }}>Voir plus</button><button className="px-3 mx-4 py-1 bg-blue-500 text-white rounded-md mr-2">Postuler</button></div>
      </div>
      <div class="shadow-lg text-center mb-4 py-4">
        <i class="fas fa-laptop-code text-2xl text-blue-500"></i>
        <h3 class="text-xl py-2">Web Developer</h3>
        <p>Description : Stage PFE  Lorem ipsum dolor sit amet consectetur adipisicing .....</p>
        <div class="mt-2"><button className="px-3 mx-4 py-1  text-white rounded-md mr-2" style={{ backgroundColor: "#BD2C43" }}>Voir plus</button><button className="px-3 mx-4 py-1 bg-blue-500 text-white rounded-md mr-2">Postuler</button></div>
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
              <button type="button" onClick={handleReset} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Réinitialiser</button>
            </div>
            </div>
            </form>
          </div>
        </div>
        

      </>
    )}
  </>
);}
