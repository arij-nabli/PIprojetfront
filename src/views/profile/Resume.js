import React, { useState, useEffect } from 'react';

function Resume() {
  const [pdfText, setPdfText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPdfText = async () => {
      try {
        const response = await fetch('http://localhost:5000/pdf/parse-pdf');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPdfText(data.text);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching PDF text:', error);
        setError('An error occurred while fetching the PDF text.');
        setLoading(false);
      }
    };

    fetchPdfText();
  }, []);

  return (
    <div>
      <h1>PDF Text</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>{pdfText}</p>
      )}
    </div>
  );
}

export default Resume;
