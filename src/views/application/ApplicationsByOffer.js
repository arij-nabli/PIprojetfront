import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from 'components/LoadingScreen';
const ApplicationsByOffer = () => {
  const { offerId } = useParams();
  const [applications, setApplications] = useState([]);
  const [expandedApp, setExpandedApp] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [interviewDate, setInterviewDate] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/applications/getByOffer/${offerId}`);
        setApplications(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [offerId]);

  const toggleDetails = (id) => {
           setExpandedApp(id);
  };

  const handleDownload = (e,id) => {
    e.stopPropagation();
    // Download logic (trigger download without collapsing)
    const downloadLink = document.createElement('a');
    downloadLink.href = `http://localhost:5000/${applications.find(app => app._id === id).resume}`;
    downloadLink.download = 'resume.pdf'; // Adjust file type based on actual resume format
    downloadLink.click();
  };

  const handleInterviewDate = async ( id, date) => {
    console.log(date);
    try {
      const response = await axios.put(
        `http://localhost:5000/applications/setInterviewDate/${id}`,
        {
          interviewDate: date,
        }
      );

      if (response.status === 200) {
        // Update the application in the state
        setApplications(
          applications.map((app) =>
            app._id === id ? { ...app, interviewDate: date } : app
          )
        );
      } else {
        throw new Error("Failed to update interview date");
      }
    } catch (error) {
      console.error("Error updating interview date:", error);
    }
  };
  const handleDecision = async (id, decision) => {
    try {
        const response = await axios.put(`http://localhost:5000/applications/${id}`, {
          status: decision
        });
    
        if (response.status === 200) {
          // Update the application in the state
          setApplications(applications.map(app => 
            app._id === id ? { ...app, status: decision } : app
          ));
        } else {
          throw new Error('Failed to update application status');
        }
      } catch (error) {
        console.error('Error updating application status:', error);
      }
  };
  const sortedApplications = [...applications].sort((a, b) => {
    if (a.status === 'Pending') return -1;
    if (b.status === 'Pending') return 1;
    if (a.status === 'Accepted') return -1;
    if (b.status === 'Accepted') return 1;
    return 0;
  });
  return (
    <>
      {isLoading ? (
        <LoadingScreen isLoading={true} />
      ) : (
        <div className="flex flex-col items-center mt-5">
          <h1 className="text-2xl font-bold mb-5">Applications</h1>
          {sortedApplications.map((application) => (
            <div
              key={application._id}
              className={`flex flex-col bg-white shadow-md rounded-lg p-6 mb-5 w-full sm:w-4/5 cursor-pointer hover:bg-gray-100`}
              onClick={() => toggleDetails(application._id)}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-xl">
                  Applicant: {application.candidate.username}
                </h2>
                <div className="flex items-center">
                  <i className="fas fa-envelope mr-2 text-gray-400"></i>
                  <p className="text-sm">{application.candidate.email}</p>
                </div>
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
                    <i className="fas fa-download"></i> Download CV
                  </button>
                </div>
              </div>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => toggleDetails(application._id)}
              >
                {expandedApp === application._id ? (
                  <i className="fas fa-chevron-down"></i>
                ) : (
                  ""
                )}
              </button>
              {expandedApp === application._id && (
                <div className="mt-5">
                  <p className="text-sm mb-2">Cover Letter:</p>
                  <p>{application.cover_letter}</p>
                  {application.status == "Pending" && (
                    <div className="flex justify-center mt-4">
                      <button
                        className="bg-green-500 mr-3 hover:bg-green-600  text-white px-4 py-2  "
                        onClick={(e) =>
                          handleDecision(e, application._id, "Accepted")
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 ml-3 text-white px-4 hover:bg-custom-red py-2 q"
                        onClick={(e) =>
                          handleDecision(e, application._id, "Refused")
                        }
                      >
                        Refuse
                      </button>
                    </div>
                  )}
                  {
                    (application.status === "Accepted" && (
                      <div className="flex justify-center mt-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
                          onClick={() =>
                            handleInterviewDate(
                              application._id,
                              interviewDate
                            )
                          }
                        >
                          Schedule Video Interview
                        </button>
                        <input
                          type="date"
                          value={interviewDate}
                          onChange={(e) => setInterviewDate(e.target.value)}
                          inline
                        />
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ApplicationsByOffer;
