import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import OfferCard from "components/Cards/OfferCard";
import { Link } from "react-router-dom";
import LoadingScreen from 'components/LoadingScreen';
import noData from '../../assets/img/no-data.png';
const CompanyOffers = () => {
  const [user, setUser] = useState(null);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          'http://localhost:5000/auth/getUserDataFromToken',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setUser(response.data.user);

        if (response.data.user && response.data.user._id) {
          const offersResponse = await axios.get(
            `http://localhost:5000/offers/getByCompany/${response.data.user._id}`
          );
          console.log(offersResponse.data);
          setOffers(offersResponse.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen isLoading={true} />
      ) : (
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-4xl font-bold mb-6 text-center text-custom-red">
            Company Offers
          </h1>
          {! offers.length > 0 ?  <div className="flex justify-center items-center">
            <img 
              className="max-w-lg h-auto mx-auto object-contain" 
              src={noData} 
              alt='nodata'  
            />
          </div>
          :
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className={`bg-white shadow-md rounded-lg p-6 mb-6 relative hover:shadow-lg`}
              >
                <div className="absolute top-0 right-0 bg-purple-700 text-white px-2 py-1 rounded-bl-lg rounded-tr-lg">
                  <i className="fas fa-briefcase"></i>
                </div>
                <Link to={`/company/applications/${offer._id}`} className="absolute bottom-2 right-2 text-green-500 px-2 py-1 rounded-full">
                  <i className="fas fa-file-arrow-up mr-1"></i> {offer.applications.length}
                </Link>
                <Link
                  className="text-2xl font-bold mb-4 text-custom-red hover:text-red-800"
                  to={`/offer-details/${offer._id}`}
                >
                  {offer.title}
                </Link>
                <p className="mb-2 font-medium">
                  <span className="font-bold text-gray-700">Salary Range:</span>{' '}
                  {offer.salary_range.min} - {offer.salary_range.max}
                </p>
                <div className="flex mb-2">
                  <p className="mr-4 font-medium">
                    <span className="font-bold text-gray-700">Start Date:</span>{' '}
                    {new Date(offer.start_date).toLocaleDateString()}
                  </p>
                  <p className="font-medium">
                    <span className="font-bold text-gray-700">End Date:</span>{' '}
                    {new Date(offer.end_date).toLocaleDateString()}
                  </p>
                </div>
                <p className="mb-2 font-medium">
                  <span className="font-bold text-gray-700">Location:</span> {offer.location}
                </p>
                <p className="mb-2 font-medium">
                  <span className="font-bold text-gray-700">Type:</span> {offer.type}
                </p>
                <p className="mb-2 font-medium">
                  <span className="font-bold text-gray-700">Status:</span> {offer.status}
                </p>
                <p className="mb-2 font-medium">
                  <span className="font-bold text-gray-700">Category:</span> {offer.category}
                </p>
                <ul className="list-disc pl-4">
                  {offer.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-600">
                      <i className="fas fa-check-circle mr-2"></i>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>}
        </div>
      )}
    </>
  );
};

export default CompanyOffers;
