import React from 'react';
import { Link } from 'react-router-dom';


const OfferCard = ({ companyphoto, jobTitle, companyName , Category ,type ,location , area,requirements , viewMoreLink, handleApplyClick, showApplyForm }) => {
    return (
        <div class="p-5 lg:col-span-2">
    <div class="shadow-lg bg-white rounded-lg text-center ">
        <div class="py-4  px-6 border-b border-gray-200 flex items-center justify-center ">
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
            <h3 className="text-xl font-semibold justify-center">{Category}</h3>

                
            <p className="mt-2 text-sm leading-relaxed text-gray-600">Location: {location}</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">Sector: {area}</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">Type: {type}</p>
            <div className="mt-4">
                        <h3 className="text-lg font-semibold">Requirements:</h3>
                        <ul className="list-disc pl-4">
                            {requirements.map((requirement, index) => (
                                <p key={index}>{requirement.name}</p>
                            ))}
                        </ul>
                    </div>
            
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
        </div>
    );
};

export default OfferCard;