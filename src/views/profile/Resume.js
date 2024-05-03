import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Resume() {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get('https://esprit-compass-backend.vercel.app/pdf/parse-pdf'); // Adjust the URL if your backend is running on a different port or domain
        setResumeData(response.data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchResumeData();
  }, []);

  return (
    <div>
      <h1>Resume</h1>
      {resumeData && (
        <div>
          {resumeData['FORMATION'] && (
            <div>
              <h2>Formation</h2>
              <ul>
                {resumeData['FORMATION'].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {resumeData['EXPÉRIENCE PROFESSIONELLE'] && (
            <div>
              <h2>Expérience Professionnelle</h2>
              <ul>
                {resumeData['EXPÉRIENCE PROFESSIONELLE'].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Add more sections like this */}
          {/* Example: */}
          {resumeData['Email'] && (
            <div>
              <h2>Email</h2>
              <p>{resumeData['Email']}</p>
            </div>
          )}
          {/* Add more sections like this */}
          {/* Example: */}
          {resumeData['GitHub'] && (
            <div>
              <h2>GitHub</h2>
              <p>{resumeData['GitHub']}</p>
            </div>
          )}
          {/* Add more sections like this */}
          {/* Example: */}
          {resumeData['LinkedIn'] && (
            <div>
              <h2>LinkedIn</h2>
              <p>{resumeData['LinkedIn']}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Resume;
