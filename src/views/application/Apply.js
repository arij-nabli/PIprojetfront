import React, { useState } from "react";
import "react-input-range/lib/css/index.css"; // Don't forget to import the styles
import InputRange from "react-input-range";
import axios from "axios";
export default function Appli({ onClose,offer,user }) {
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [salary, setSalary] = useState({ min: offer.salary_range.min, max: offer.salary_range.max });

  const handleNext = () => {
    setStep(step + 1);
    console.log(offer)
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.value);
  };

  const handleSalaryChange = (value) => {
    setSalary(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('candidate', user._id);
    formData.append('offer', offer._id);
    formData.append('resume', resume);
    formData.append('cover_letter', coverLetter);
    formData.append('salary_expectation',JSON.stringify(salary));
  
    try {
      const response = await axios.post('http://localhost:5000/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      if (response.status === 201) {
        setStep(4);
      }
    } catch (error) {
      console.error(error);
      setStep(5)
    }
  };
  return (
 <div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-xs max-h-full text-center relative">
    <button onClick={onClose} className="absolute right-0 top-0 m-4">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
    <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
      Job Application Form 
    </h2>
    <form onSubmit={handleFormSubmit}>
      {step === 1 && (
      <>
    <label htmlFor="dropzone-file" className="flex flex-col items-center px-4 py-6 bg-red-100 text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M13 6V4a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2h4v2a2 2 0 002 2h6a2 2 0 002-2V8a2 2 0 00-2-2h-1zm-1 0h2l-2-2v2zm-1 2H4V4h6v4a1 1 0 001 1h1v1H9a1 1 0 01-1-1V6H1v6h3V9a1 1 0 011-1h1v4H3a1 1 0 01-1-1V4a1 1 0 011-1h8a1 1 0 011 1v4h-1a1 1 0 01-1-1V6zm2 4h3l-3 3v-3z" clipRule="evenodd"></path>
      </svg>
      <span className="mt-2 text-base leading-normal text-black">{resume?resume.name :" Select a file"}</span>
      <input type='file' className="hidden" id="dropzone-file" accept=".pdf,.doc,.docx" onChange={(e) => handleResumeChange(e)} />
    </label>
    <button type="button" disabled={!resume} className="bg-custom-red hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleNext}>
      Next
    </button>
  </>
      )}
      {step === 2 && (
        <>
          <label className="block text-left text-sm font-bold mb-2" htmlFor="coverLetter">
            Cover Letter
          </label>
          <textarea id="coverLetter" rows="10" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          <button type="submit" className="bg-custom-red hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleNext}>
            Next
          </button>
        </>
      )}
      {step === 3 && (
        <>
          <label className="block text-left text-sm font-bold mb-10 w-full" htmlFor="salary">
            Salary Range
          </label>
          <InputRange minValue={offer.salary_range.min}  maxValue={offer.salary_range.max} value={salary} onChange={(value) => setSalary(value)} />
          <button type="submit" className="bg-custom-red hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-10">
            Apply Now
          </button>
        </>
      )}
          {step === 4 && (
        <>
          <div>
            <i className="fas fa-check-circle text-3xl text-green-500">  S u c c e s s</i>
         
          </div>
        </>
      )}
       {step === 5 && (
        <>
          <div>
            Error
          </div>
        </>
      )}
    </form>
  </div>
</div>
  );
}
