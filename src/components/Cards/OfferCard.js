import React from 'react';
import { Link } from 'react-router-dom';


const OfferCard = ({ companyphoto, jobTitle, companyName, description, viewMoreLink, handleApplyClick, showApplyForm }) => {
    return (
        <div className="shadow-lg bg-white rounded-lg text-center flex flex-col mb-5 ">
            <div className="py-4 px-6 border-b border-gray-200 flex items-center justify-center">
                <img
                    src={companyphoto}
                    style={{ width: 35, height: 35 }}
                    className="border-1 shadow rounded-full border-black mr-4 lg:mr-6 justify-center"
                    alt="Default"
                />
                <div>
                    <h3 className="text-xl font-semibold justify-center">{jobTitle}</h3>
                    <p className="text-base leading-relaxed text-blueGray-700 justify-center">{companyName}</p>
                </div>
            </div>
            <div className="px-6 py-2 text-center">
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
            </div>
           
            <div class="flex justify-center py-4 mb-4 ">
            <Link
                  class="px-4 py-2 text-sm text-white bg-red-500 rounded-md mr-2"style={{ backgroundColor: "#BD2C43" }}
                  to={viewMoreLink}
                >
                View more
                </Link>
        </div>
        </div>
    );
};

export default OfferCard;