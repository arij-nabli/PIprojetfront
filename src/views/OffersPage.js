import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import feriel from "../assets/img/feriel.jpg";
import { Link } from "react-router-dom";
import companyphoto from "../assets/img/mobiblanc.jpeg";
import Apply from "./Apply";
import OfferCard from "components/Cards/OfferCard";
import LoadingScreen from "components/LoadingScreen";
export default function Offer() {
  const [companyName, setCompanyName] = useState("Mobiblanc Tunisie");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState("Feriel BHK");
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState(
    "Full-Stack web developer with 3 years of experience in building web applications."
  );
  //si role=student haka sinon alumni looking for job offer
  const [status, setStatus] = useState("A student looking for an internship.");
  const [email, setEmail] = useState("");
  const [showApplyForm, setShowApplyForm] = useState(false);

  const handleApplyClick = () => {
    setShowApplyForm(!showApplyForm); // Inversion de l'état lors du clic sur le bouton "Apply"
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
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
  const [nomEntreprise, setNomEntreprise] = useState("");
  const [dateOffre, setDateOffre] = useState("");
  const [typeOffre, setTypeOffre] = useState("");
  const [secteurActivite, setSecteurActivite] = useState("");
  const [lieuOffre, setLieuOffre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez gérer la soumission du formulaire ici
    // Par exemple, vous pouvez envoyer les données à un serveur ou les traiter localement
  };

  const handleReset = () => {
    setNomEntreprise("");
    setDateOffre("");
    setTypeOffre("");
    setSecteurActivite("");
    setLieuOffre("");
  };
  const offers = [
    {
      id: 1,
      companyphoto: "https://example.com/photo.jpg",
      jobTitle: "Software Engineer",
      companyName: "Example Inc.",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into",
      viewMoreLink: `/offer-details/${1}`,
      // Define handleApplyClick and showApplyForm as needed
    },
    {
      id: 2,
      companyphoto: "https://example.com/photo.jpg",
      jobTitle: "Software Engineer",
      companyName: "Example Inc.",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into",
      viewMoreLink: `/offer-details/${2}`,
      // Define handleApplyClick and showApplyForm as needed
    },
    {
      id: 3,
      companyphoto: "https://example.com/photo.jpg",
      jobTitle: "Software Engineer",
      companyName: "Example Inc.",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into",
      viewMoreLink: `/offer-details/${3}`,
      // Define handleApplyClick and showApplyForm as needed
    },
    // More offers...
  ];

  return (
    <>
      {isLoading ? (
      <LoadingScreen isLoading={true} />
      ) : (
        <>
          {token ? <IndexNavbar /> : <AuthNavbar />}

          <div class="mx-auto grid   lg:grid-cols-4 sm:grid-cols-2 gap-6 mt-4 ">
          <div className="shadow-lg p-5 lg:col-span-1">
              <div className="flex flex-col bg-white">
                {/* <div className="flex items-center justify-center mt-10 w-full">
                  <img
                    src={feriel}
                    style={{ width: 200, height: 200 }}
                    className="mt-5 border-1 shadow rounded-full border-black"
                    alt="Default"
                  />
                </div> */}

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
                    viewMoreLink={offer.viewMoreLink}
                    // Pass handleApplyClick and showApplyForm as needed
                  />
                ))}
              </div>
            </div>

            <div class="shadow p-5 ">
              <form onSubmit={handleSubmit}>
                <div class="px-6  my-4 py-4">
                  <div>
                    <div className="flex items-center mb-4 justify-center">
                    <i class="fa-solid fa-magnifying-glass" style={{color:"rgb(189,44,67)"}}></i>
                      <h2
                        className="text-lg  font-semibold"
                        style={{ color: "#BD2C43" }}
                      >
                        Filter
                      </h2>
                    </div>
                  </div>
           
                  <div className="my-5">
                
                    <input
                      type="text"
                      id="nom-entreprise"
                      value={nomEntreprise}
                      onChange={(e) => setNomEntreprise(e.target.value)}
                      className=" border-0 px-3 py-3  text-sm border-b-2 focus:outline-none focus:border-b-2 focus:border-custom-red focus:ring-0  w-full ease-linear transition-all duration-150"
                    placeholder="Search for a company..."
                    />
                  </div>
                  <div className="my-5">
                 
                    <input
                      type="date"
                      id="date-offre"
                      value={dateOffre}
                      onChange={(e) => setDateOffre(e.target.value)}
                      className=" border-0 px-3 py-3  text-sm border-b-2 focus:outline-none focus:border-b-2 focus:border-custom-red focus:ring-0  w-full ease-linear transition-all duration-150"

                    />
                  </div>
                  <div className="my-5">
                
                    <select
                      id="type-offre"
                      value={typeOffre}
                      onChange={(e) => setTypeOffre(e.target.value)}
                      className=" border-0 px-3 py-3  text-sm border-b-2 focus:outline-none focus:border-b-2 focus:border-custom-red focus:ring-0  w-full ease-linear transition-all duration-150"

                    >
                      <option value="">Select Offer type</option>
                      <option value="offre">Job</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  <div className="my-5">
               
                    <select
                      id="secteur-activite"
                      value={secteurActivite}
                      onChange={(e) => setSecteurActivite(e.target.value)}
                      className=" border-0 px-3 py-3  text-sm border-b-2 focus:outline-none focus:border-b-2 focus:border-custom-red focus:ring-0  w-full ease-linear transition-all duration-150"

                    >
                      <option value="">Select Industry</option>
                      <option value="IT">IT</option>
                      <option value="Business">Business</option>
                      <option value="Civil">Civil</option>
                      <option value="Electromecanique">Electromecanique</option>
                    </select>
                  </div>
                  <div className="my-5">
                 
                    <input
                      type="text"
                      id="lieu-offre"
                      value={lieuOffre}
                      onChange={(e) => setLieuOffre(e.target.value)}
                      className=" border-0 px-3 py-3  text-sm border-b-2 focus:outline-none focus:border-b-2 focus:border-custom-red focus:ring-0  w-full ease-linear transition-all duration-150"
                      placeholder="Location..."
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 transition duration-150 ease-in-out"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
