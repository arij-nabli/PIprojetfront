import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import LoadingScreen from 'components/LoadingScreen';
import noData from '../../assets/img/no-data.png';
import { Link } from 'react-router-dom';
const ApplicationsByUser = () => {
  const { candidateId } = useParams();
  const [applications, setApplications] = useState([]);
  const [expandedApp, setExpandedApp] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`esprit-compass-backend.vercel.app/applications/getBycandidate/${candidateId}`);
        setApplications(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [candidateId]);

  const toggleDetails = (id) => {
    setExpandedApp(expandedApp === id ? null : id);
  };

  const handleDownload = (e,id) => {
    e.stopPropagation();
    // Download logic (trigger download without collapsing)
    const downloadLink = document.createElement('a');
    downloadLink.href = `esprit-compass-backend.vercel.app/${applications.find(app => app._id === id).resume}`;
    downloadLink.download = 'resume.pdf'; // Adjust file type based on actual resume format
    downloadLink.click();
  };

  const sortedApplications = [...applications].sort((a, b) => {
    if (a.status === 'Accepted') return -1;
    if (b.status === 'Accepted') return 1;
    if (a.status === 'Refused') return -1;
    if (b.status === 'Refused') return 1;
    return 0;
  });
  const clickOffer = (e,id) => {
    e.stopPropagation()
    navigate(`/offer-details/${id}`)
  }
  return (
    <>
      {isLoading ? (
        <LoadingScreen isLoading={true} />
      ) : (
        <div>
          <IndexNavbar id={candidateId} />
          <div className="flex   flex-col items-center ">
            <h1 className="text-2xl font-bold my-5">Applications</h1>
            {!(applications.length > 0) ? (
              <div className="flex justify-center">
                <img
                  className="max-w-lg h-auto mx-auto object-contain"
                  src={noData}
                  alt="nodata"
                />
              </div>
            ) : (
              sortedApplications.map((application) => (
                <div
                  key={application._id}
                  className={`flex flex-col bg-white shadow-md rounded-lg p-6 mb-5 w-full sm:w-4/5  hover:bg-gray-100`}
                  onClick={() => toggleDetails(application._id)}
                >
                  <div className="flex justify-between items-center mb-4 ">
                    <h2
                      onClick={(e) => clickOffer(e, application.offer._id)}
                      className="font-bold text-xl hover:underline cursor-pointer"
                    >
                      Offer: {application.offer.title}
                    </h2>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <i className="fas fa-clock mr-2 text-gray-400"></i>
                      <p className="text-sm">
                        Applied:{" "}
                        {new Date(
                          application.application_date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm mr-2">Salary: </p>
                      <p className="text-sm">
                        {application.salary_expectation.min} -{" "}
                        {application.salary_expectation.max}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm">
                      Status:{" "}
                      <p
                        className={`text-sm ${
                          application.status === "Accepted"
                            ? "text-green-500"
                            : application.status === "Refused"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {application.status}
                      </p>{" "}
                    </div>
                    <div className="flex items-center">
                      <button
                        className="text-green-500 hover:underline mr-2"
                        onClick={(e) => handleDownload(e, application._id)}
                      >
                        <i className="fas fa-download mr-2"></i>
                        {application.resume.split("\\").pop().substring(24)}
                      </button>
                    </div>
                  </div>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => toggleDetails(application._id)}
                  >
                    {expandedApp === application._id ? (
                      <i className="fas fa-chevron-up"></i>
                    ) : (
                      <i className="fas fa-chevron-down"></i>
                    )}
                  </button>
                  {expandedApp === application._id && (
                    <div className="mt-5">
                      <p className="text-sm mb-2">Cover Letter:</p>
                      <p>{application.cover_letter}</p>
                      {application.status === "Accepted" && (
                        <div className="mt-5">
                          <p>Interview Date</p>
                          <p>
                            {new Date(
                              application.interviewDate
                            ).toLocaleString()}
                          </p>
                          <Link to="/interview-room">
                            <button className="mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out">
                              Join Interview room now
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationsByUser;
