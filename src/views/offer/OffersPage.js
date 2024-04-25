import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import OfferCard from "components/Cards/OfferCard";
import feriel from "../../assets/img/feriel.jpg";
import { Link } from "react-router-dom";
import companyphoto from "../../assets/img/mobiblanc.jpeg";
import CompanyNavbar from "components/Navbars/CompanyNavbar";
import Auth from "layouts/Auth";
import LoadingScreen from "components/LoadingScreen";
import { Select } from "@chakra-ui/react";
import noData from "../../assets/img/no-data.png";
export default function OffersPage() {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchDate, setSearchDate] = useState("today");
  const [searchSector, setSearchSector] = useState("");
  const [processedImage, setProcessedImage] = useState(null);
  const [companyImages, setCompanyImages] = useState(null);
  const handleLocationChange = (e) => {
    setSearchLocation(e.target.value);
  };
  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
  };
  const handleStatusChange = (e) => {
    setSearchStatus(e.target.value);
  };

  const handleSectorChange = (e) => {
    setSecteurActivite(e.target.value);
  };

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState("Feriel BHK");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [description, setDescription] = useState("");

  const [email, setEmail] = useState("");
  const [offers, setOffers] = useState([]);
  /*const filteredOffers = offers.filter(offer => {
    return offer.location.toLowerCase().includes(searchLocation.toLowerCase());
  });
  */

  const fetchOffers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/offers/getall");
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchCompanyImage = async (companyId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/get-image?id=${companyId}`,
        { responseType: "blob" }
      );
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const initializeOffers = async () => {
      setIsLoading(true);
      const offers = await fetchOffers();
      const companyImages = {};

      for (let offer of offers) {
        const companyId = offer.provider._id;
        companyImages[companyId] = await fetchCompanyImage(companyId);
      }

      setOffers(offers);
      setCompanyImages(companyImages);
      setIsLoading(false);
    };

    initializeOffers();
    ;
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
        getProfileImage(response.data.user._id);
        //setDescription(response.user.description)
       
      } catch (error) {
        console.error(error);
        ;
      }
    };

    fetchUserData();
  }, [token]);
  const getProfileImage = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/get-image?id=${id}`,
        { responseType: "blob" }
      );
      const imageUrl = URL.createObjectURL(response.data);
      setProcessedImage(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const [nomEntreprise, setNomEntreprise] = useState("");
  const [typeOffre, setTypeOffre] = useState("");
  const [secteurActivite, setSecteurActivite] = useState("");
  const [offerStatus, setOfferStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setSearchStatus("");
    setSearchDate("");
    setTypeOffre("");
    setSecteurActivite("");
    setSearchLocation("");
  };
  const filterOffers = (offer) => {
    // Filtrer par date
    const createdDate = new Date(offer.created_at);
    const today = new Date();

    let dateFilter;
    switch (searchDate) {
      case "This-day":
        dateFilter = createdDate.toDateString() === today.toDateString();
        console.log(dateFilter);
        break;
      case "This-week":
        const startOfWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay()
        );
        const endOfWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay() + 6
        );
        dateFilter = createdDate >= startOfWeek && createdDate <= endOfWeek;
        console.log(dateFilter);
        break;
      case "This-month":
        dateFilter =
          createdDate.getFullYear() === today.getFullYear &&
          createdDate.getMonth() === today.getMonth();

        break;

      default:
        dateFilter = true;
    }
    const locationFilter =
      searchLocation === "" ||
      offer.location.toLowerCase().includes(searchLocation.toLowerCase());

    const statusFilter =
      searchStatus === "" ||
      offer.status.toLowerCase().includes(searchStatus.toLowerCase());

    const sectorFilter =
      secteurActivite === "" || offer.area === secteurActivite;

    // Retourner vrai si toutes les conditions sont remplies
    return locationFilter && dateFilter && statusFilter && sectorFilter;
  };

  const filteredOffers = offers.filter(filterOffers);

  return (
    <div className="bg-gray-100">
      {isLoading ? (
        <LoadingScreen isLoading={isLoading} />
      ) : (
        <>
          {!user.role ? (
            <AuthNavbar />
          ) : user.role === "company" ? (
            <CompanyNavbar id={user._id}/>
          ) : (
            <IndexNavbar id={user._id} />
          )}
          <div class="mx-auto grid min-h-screen lg:grid-cols-4 sm:grid-cols-2 gap-6 mt-4">
            <div className="bg-white shadow-lg p-5 lg:col-span-1 ">
              <div className="flex flex-col items-center bg-white">
                <>
                  <img
                    src={processedImage}
                    style={{ width: 230, height: 230 }}
                    className="mt-5 border-1 shadow-xl rounded-full border-black" // Modifiez la classe shadow-lg
                    alt="Profile"
                  />
                </>

                <div className="mx-auto mt-2">
                  <h3 className="text-4xl text-center font-semibold leading-normal mb-2 text-blueGray-700">
                    {name}
                  </h3>
                  <p className="mb-4 text-lg text-center  leading-relaxed text-blueGray-700">
                    {description}
                  </p>
                </div>

                <div className=" border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center ">
                    <Link
                      className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                      to="/profile"
                    >
                      <i className="fas fa-user-circle text-blueGray-800 mr-2 text-sm"></i>{" "}
                      My profile
                    </Link>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-full font-bold lg:w-9/12   mb-6 ">
                      <Link
                        className="text-blueGray-700 hover:text-blueGray-500 flex items-center text-xs uppercase py-3 font-bold "
                        to={`/applications/${user._id} `}
                      >
                        <i className="fas fa-clipboard-list text-blueGray-700 mr-2 text-sm"></i>{" "}
                        <span className=" text-nowrap">My applications</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-5 lg:col-span-2">
          { ! filterOffers.length > 0 ? 
            <div className="flex justify-center items-center">
              <img
                className="max-w-lg h-auto mx-auto object-contain"
                src={noData}
                alt="nodata"
              />
            </div>
          :
             <div>
                {filteredOffers.map((offer, index) => (
                  <OfferCard
                    key={index}
                    companyphoto={companyImages[offer.provider._id]} // Pass company image
                    jobTitle={offer.title}
                    companyName={offer.provider.name}
                    Category={offer.category}
                    location={offer.location}
                    area={offer.area}
                    type={offer.type}
                    status={offer.status}
                    viewMoreLink={`/offer-details/${offer._id}`}
                  />
                ))}
              </div>}
            </div>

            <div class="bg-white shadow-lg p-5 lg:col-span-1 ">
              <form onSubmit={handleSubmit}>
                <div class="px-6 mx-6  my-4 py-4">
                  <div>
                    <div className="flex items-center mb-4">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{ color: "#BD2C43" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 19l-6-6M15 11l6-6M15 11H9"
                        />
                      </svg>
                      <h2
                        className="text-lg  font-semibold"
                        style={{ color: "#BD2C43" }}
                      >
                        Filter
                      </h2>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block " htmlFor="nom-entreprise">
                      Offer Status
                    </label>
                    <input
                      className=" border-0 px-3 mb-3 text-sm border-b-2 focus:outline-none focus:border-b-2 focus:border-custom-red focus:ring-0  w-full ease-linear transition-all duration-150"
                      type="text"
                      id="lieu-offre"
                      value={searchStatus}
                      onChange={handleStatusChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block " htmlFor="date-offre">
                      Offer Date:
                    </label>
                    <select
                      className=" border-0 px-3 mb-3  text-sm border-b-2 focus:outline-none focus:border-b-2 focus:border-custom-red focus:ring-0  w-full ease-linear transition-all duration-150"
                      id="date-filter"
                      value={searchDate}
                      onChange={handleDateChange}
                    >
                      <option value="">Select...</option>
                      <option value="This-day">Today</option>
                      <option value="This-week">This Week</option>
                      <option value="This-month">This Month</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block" htmlFor="secteur-activite">
                      Activity Area:
                    </label>
                    <select
                      className="border-0 px-3 mb-3 text-sm border-b-2 focus:outline-none focus:border-b-2 focus:border-custom-red focus:ring-0 w-full ease-linear transition-all duration-150"
                      id="secteur-activite"
                      value={secteurActivite}
                      onChange={handleSectorChange}
                    >
                      <option value="">Select...</option>
                      <option value="IT">IT</option>
                      <option value="Business">Business</option>
                      <option value="Civil">Civil</option>
                      <option value="Electromecanique">Electromecanique</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block " htmlFor="lieu-offre">
                      Location
                    </label>

                    <input
                      className=" border-0 px-3 mb-3 text-sm border-b-2 focus:outline-none focus:border-b-2 focus:border-custom-red focus:ring-0  w-full ease-linear transition-all duration-150"
                      type="text"
                      id="lieu-offre"
                      value={searchLocation}
                      onChange={handleLocationChange}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
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
    </div>
  );
}
