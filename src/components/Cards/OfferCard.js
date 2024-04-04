import React from 'react';
import { Link } from 'react-router-dom';


const OfferCard = ({ companyphoto, jobTitle, companyName , Category ,type ,location , area, status , viewMoreLink, handleApplyClick, showApplyForm }) => {
    return (
        <div class="p-5 lg:col-span-2">
    <div class="shadow-lg bg-white rounded-lg text-center ">
        <div class="py-4  px-6 border-b border-gray-200 flex items-center justify-center ">
                <img
                    src={companyphoto}
                    style={{ width: 45, height: 45 }}
                    className="border-1 shadow rounded-full border-black mr-4 lg:mr-6 justify-center"
                    alt="Default"
                />
                <div>
                    <h3 className="text-xl font-semibold justify-center text-gray-900">{jobTitle}</h3>
                    <div><p className="text-base leading-relaxed text-blueGray-700 justify-center">{companyName} ~ {Category} </p>
                   </div>
                </div>
            </div>
            <div className="px-6 py-2 justify-center text-center">
            

              <div className=" flex mt-2 text-sm leading-relaxed justify-center text-center  font-semibold ">
            <h3  style={{ color: "#BD2C43" }}>Location : </h3>
            <h3 className=" text-gray-900  " >{ location}</h3></div>  
            <div className=" flex mt-2 text-sm leading-relaxed justify-center text-center font-semibold ">
            <h3  style={{ color: "#BD2C43" }}>Sector : </h3>
            <h3 className=" text-gray-900  " >{ area}</h3></div> 
            <div className=" flex mt-2 text-sm leading-relaxed justify-center text-center font-semibold ">
            <h3  style={{ color: "#BD2C43" }}>Type : </h3>
            <h3 className=" text-gray-900  " >{ type}</h3></div> 
            <div className=" flex mt-2 text-sm leading-relaxed justify-center text-center font-semibold ">
            <h3  style={{ color: "#BD2C43" }}>Status : </h3>
            <h3 className=" text-gray-900  " >{ status}</h3></div> 
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