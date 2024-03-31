import Navbar from "components/Navbars/IndexNavbar.js";
import HashLoader from "react-spinners/HashLoader";
import React from "react";
import axios from "axios";
import companyphoto from "../../assets/img/mobiblanc.jpeg";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Appli from "../application/Apply";
import IndexNavbar from "components/Navbars/IndexNavbar";
import AuthNavbar from "components/Navbars/AuthNavbar";
import CompanyNavbar from "components/Navbars/CompanyNavbar";
export default function DetailsOffer() {
  const [companyemail, setCompanyEmail] = useState("bouzayeni@mobiblanc.com");
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [user, setUser] = useState(null);
  const handleApplyClick = () => {
    setShowApplyForm(!showApplyForm); // Inversion de l'état lors du clic sur le bouton "Apply"
  };
  const { id } = useParams();

  const [companyName, setCompanyName] = useState("Mobiblanc Tunisie");
  const [companyLocalisation, setCompanyLocalisation] = useState(
    "Tunisie - Tunis -Centre Urbain Nord"
  );

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/offers/get/${id}`
        );
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching offer details:", error);
        setIsLoading(false);
      }
    };

    fetchOfferDetails();
  }, [id]);

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
        setUser(response.data.user);

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
          {!user ? (
            <AuthNavbar />
          ) : user.role === "company" ? (
            <CompanyNavbar />
          ) : (
            <IndexNavbar />
          )}
          <div className="shadow-lg mt-10 lg:col-span-2 px-8 lg:px-16 mx-4 lg:mx-16 py-4 flex flex-col lg:flex-row items-start lg:items-center">
            <img
              src={companyphoto}
              style={{ width: 200, height: 200 }}
              className="border-1 px-4 border-black mb-4 lg:mb-0 lg:mr-8"
              alt="logo company"
            />
            <div className="text-center lg:text-left">
              <h6 className="text-2xl lg:text-4xl font-semibold leading-normal mb-2 text-blueGray-900">
                {offer.offerType}
              </h6>

              <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                {companyName}
              </p>
            </div>
            {!user ? (
              "Sign in to apply "
            ) : user.role == "company" ? (
              <div className="ml-auto">
  <Link className=" text-custom-red hover:text-custom-darkred font-bold" to={`/company/applications/${offer._id}`}>
                View Applications
              </Link>
<p className="mb-4 text-md font-semibold leading-relaxed text-blueGray-700">{offer.applications.length} : application(s)</p>
              </div>
            
              
            ) : (
              <div className="ml-auto">
                <button
                  className="p-3 text-white rounded-md mr-2 mb-3 mt-10"
                  onClick={handleApplyClick}
                  style={{ backgroundColor: "#BD2C43" }}
                >
                  Apply Now
                </button>
                {showApplyForm && (
                  <Appli onClose={handleApplyClick} offer={offer} user={user} />
                )}
                <p className="mb-4 text-lg font-semibold leading-relaxed text-blueGray-700">
                  {offer.applications.length} : application(s)
                </p>
              </div>
            )}
          </div>
          <div class="grid lg:grid-cols-4 sm:grid-cols-1 gap-6 mt-4 ml-16 mr-16">
            <div>
              <div className="shadow-lg p-5 lg:col-span-1 sm:col-span-full ml-4 sm:ml-0">
                <h6 className="mb-2 mt-2 text-lg font-semibold leading-relaxed text-blueGray-900">
                  Informations
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full ">
                    <h1
                      className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800"
                      style={{ color: "#BD2C43" }}
                    >
                      Localisation :
                    </h1>
                    <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">
                      {companyLocalisation}
                    </p>
                    <h1
                      className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800"
                      style={{ color: "#BD2C43" }}
                    >
                      Type of work :{" "}
                    </h1>
                    <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">
                      Hybrid face-to-face and remote
                    </p>
                  </div>
                  <div className="w-full ">
                    <h1
                      className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800"
                      style={{ color: "#BD2C43" }}
                    >
                      Contrat :
                    </h1>
                    <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">
                      FREELANCE OR INDEPENDENT SERVICE PROVIDER
                    </p>
                    <h1
                      className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800"
                      style={{ color: "#BD2C43" }}
                    >
                      Salary :
                    </h1>
                    <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">
                      {offer.salary_range.min} - {offer.salary_range.max}
                    </p>
                  </div>
                </div>
              </div>

              <div className="shadow-lg p-5  sm:col-span-full ml-4 sm:ml-0">
                <h6 className="mb-2 mt-2 text-lg font-semibold leading-relaxed text-blueGray-900">
                  Key Words
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full ">
                    <h1
                      className="p-3 text-white rounded-md mr-2 mb-3 mt-10"
                      style={{ backgroundColor: "#BD2C43" }}
                    >
                      PHP
                    </h1>
                    <h1
                      className="p-3 text-white rounded-md mr-2 mb-3 mt-10"
                      style={{ backgroundColor: "#BD2C43" }}
                    >
                      iOS
                    </h1>
                    <h1
                      className="p-3 text-white rounded-md mr-2 mb-3 mt-10"
                      style={{ backgroundColor: "#BD2C43" }}
                    >
                      Android
                    </h1>
                    <h1
                      className="p-3 text-white rounded-md mr-2 mb-3 mt-10"
                      style={{ backgroundColor: "#BD2C43" }}
                    >
                      Data science
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="shadow-lg p-5 lg:col-span-3 sm:col-span-full mb-8 mr-4 sm:mr-0">
              <h6 className="text-2xl lg:text-4xl font-semibold leading-normal mb-8 mt-8 text-blueGray-900">
                {offer.title}
              </h6>
              <hr className="mb-8 mt-8"></hr>

              <h6 className="mb-8 mt-8 text-lg font-semibold leading-relaxed text-blueGray-700">
                About The Offer
              </h6>
              <p>
                Nous sommes la société Mobiblanc Tunisie située au centre urbain
                nord .Nous désirons avoir la possibilité de recruter des profils
                ayant effectués leurs études au sein de votre établissement avec
                des les différentes technologies tel que : - PHP symfony ( avec
                minimum 5 ans d'expérience) - iOS - Android (java et kotlin) -
                Data science - IA.
              </p>
              <p>{offer.description}</p>
              <h2>Requirements:</h2>
              {Array.isArray(offer.requirements) &&
              offer.requirements.length > 0 ? (
                <ul>
                  {offer.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              ) : (
                <div>No requirements specified</div>
              )}

              <hr className="mb-8 mt-8"></hr>
              <h6 className="mb-8 mt-8 text-lg font-semibold leading-relaxed text-blueGray-700">
                Closing date for applications:{" "}
                {new Date(offer.end_date).toISOString().split("T")[0]}
              </h6>
              <hr className="mb-8 mt-8"></hr>
              <div></div>
              <h6 className="mb-4 mt-6 text-lg font-semibold leading-relaxed text-blueGray-700">
                Added By :
              </h6>
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
  );
}
