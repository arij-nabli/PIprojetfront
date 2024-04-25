import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Resume() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pdf/parse-pdf'); // Assuming your Express server is running on localhost:3001
        setResumeData(response.data.sections);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };

    fetchResumeData();
  }, []);

  return (
    <div>
      <h1>Resume Sections</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {resumeData.map((section, index) => (
            <div key={index}>
              <h2>Section {index + 1}</h2>
              <ul>
                {section.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Resume;
