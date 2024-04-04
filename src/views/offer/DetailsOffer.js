import Navbar from "components/Navbars/IndexNavbar.js";
import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Appli from "../application/Apply";
import IndexNavbar from "components/Navbars/IndexNavbar";
import AuthNavbar from "components/Navbars/AuthNavbar";
import CompanyNavbar from "components/Navbars/CompanyNavbar";
import LoadingScreen from "components/LoadingScreen";
export default function DetailsOffer() {
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [user, setUser] = useState(null);
  const [applied, setApplied] = useState(null);
  const handleApplyClick = () => {
    setShowApplyForm(!showApplyForm); // Inversion de l'état lors du clic sur le bouton "Apply"
  };
  const { id } = useParams();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [companyphoto , setCompanyPhoto] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
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
        const response2 = await axios.get(
          `http://localhost:5000/offers/get/${id}`
        );
        setOffer(response2.data);
        getProfileImage2(response2.data.provider._id);
        console.log(response2.data); 
        const app = response2.data.applications.find(app => app.candidate === response.data.user._id);

        if(app){
          const applicationDate = new Date(app.application_date);
          const currentDate = new Date();
        
          const differenceInTime = currentDate.getTime() - applicationDate.getTime();
          const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        
          let timeDifference;
          if (differenceInDays < 1) {
            const differenceInHours = differenceInTime / (1000 * 3600);
            if (differenceInHours < 1) {
              timeDifference = "just now";
            } else {
              timeDifference = `${Math.floor(differenceInHours)} hours ago`;
            }
          } else {
            timeDifference = `${Math.floor(differenceInDays)} days ago`;
          }
        
          console.log(timeDifference);
          setApplied(timeDifference);
          console.log("applied");
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
  
    fetchData();
   


  }, [token,id]);
  const getProfileImage2 = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/get-image?id=${id}`,
        { responseType: 'blob' } 
      );
      const imageUrl = URL.createObjectURL(response.data);
     
      setCompanyPhoto(imageUrl); 
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      {isLoading ? (
    <LoadingScreen isLoading={true} />
      ) : (
        <>
          {!user ? (
            <AuthNavbar />
          ) : user.role === "company" ? (
            <CompanyNavbar />
          ) : (
            <IndexNavbar id={user._id} />
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
                {offer.title}
               
              </h6>

              <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                {offer.provider.username}
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
            
              
            ) : applied ? <div className="ml-auto text-green-500">applied {applied} </div> : (
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
                      Location :
                    </h1>
                    <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">
                    {offer.location}
                    </p>
                    <h1
                      className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800"
                      style={{ color: "#BD2C43" }}
                    >
                      Type of work :{" "}
                    </h1>
                    <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">
                      {offer.type}
                    </p>
                  </div>
                  <div className="w-full ">
                    <h1
                      className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800"
                      style={{ color: "#BD2C43" }}
                    >
                      {offer.category === "job" ? "Contrat" : "Payment"} :
                    </h1>
                    <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">
                      {offer.category === "job" && offer.contrat ? offer.contrat : offer.payment}
                    </p>
                    {offer.category !== "internship" && (
                      <>
                        <h1
                          className="mb-2 mt-2 text-lg leading-relaxed font-semibold text-blueGray-800"
                          style={{ color: "#BD2C43" }}
                        >
                          Salary :
                        </h1>
                        <p className="mb-2 mt-2 text-lg leading-relaxed text-blueGray-600">
                          {offer.salary_range.min} - {offer.salary_range.max} TND 
                        </p>
                      </>
                    )}
                    
                  </div>
                </div>
              </div>

              <div className="shadow-lg p-5  sm:col-span-full ml-4 sm:ml-0">
                <h6 className="mb-2 mt-2 text-lg font-semibold leading-relaxed text-blueGray-900">
                  Key Words
                </h6>
                <div className="flex flex-wrap">
                  {offer.requirements.map(requirement => (
                    <div className="w-full" key={requirement._id}>
                      <h1
                        className="p-3 text-white rounded-md mr-2 mb-3 mt-6"
                        style={{ backgroundColor: "#BD2C43" }}
                      >
                        {requirement.name}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="shadow-lg p-5 lg:col-span-3 sm:col-span-full mb-8 mr-4 sm:mr-0">
              <h6 className="text-2xl lg:text-4xl font-semibold leading-normal mb-8 mt-8 text-blueGray-900">
              {offer.title.toUpperCase()}
              </h6>
              <hr className="mb-8 mt-8"></hr>

              <h6 className="mb-6 mt-8 text-lg font-semibold leading-relaxed text-blueGray-700">
                About The Offer
              
              </h6>
              <p>{offer.description}</p>
              
              <p>
              <h6 className="mb-6 mt-8 text-lg font-semibold leading-relaxed text-blueGray-700">
                Requirements :
              
              </h6>
                <ul>
                  {offer.requirements.map(requirement => (
                    <li key={requirement._id}>{requirement.name}</li>
                  ))}
                </ul>
              </p>
              <h3 className="mb-6 mt-8 text-lg font-semibold leading-relaxed text-blueGray-700" style={{ color: "#BD2C43" }}>
                {offer.status}
              
              </h3>
              
              
              <hr className="mb-8 mt-8"></hr>
              <h6 className="mb-6 mt-8 text-lg font-semibold leading-relaxed text-blueGray-700">
              Starting date for working with our team : {" "}
                {new Date(offer.start_date).toISOString().split("T")[0]}
              </h6>
             
              <h6 className="mb-8 mt-6 text-lg font-semibold leading-relaxed text-blueGray-700">
                Closing date for working with our team :{" "}
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
                    {offer.provider.username}
                  </p>
                  <h3 className=" leading-normal mb-4 text-blueGray-700">
                    {offer.provider.email}
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
