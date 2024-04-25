import React, { useState, useEffect } from 'react';

function ResumeParser() {
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch('http://localhost:5000/pdf/parse-pdf');  // Assuming your Express server is running on the same host
        if (!response.ok) {
          throw new Error('Failed to fetch resume data');
        }
        const data = await response.json();
        setResumeData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchResumeData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Resume Data</h1>
      <ul>
        {Object.entries(resumeData).map(([keyword, lines]) => (
          <li key={keyword}>
            <strong>{keyword}</strong>
            {Array.isArray(lines) ? (
              <ul>
                {lines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            ) : (
              <p>{lines}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResumeParser;
