import React, { useState } from "react";

export default function Appli({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cv, setCv] = useState("");
  const [language, setLanguage] = useState("english");
  const [motivation, setMotivation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Votre logique de soumission du formulaire ici
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="bg-white rounded-lg p-8 z-10 relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-center" style={{ color: "#BD2C43" }}>Job Application Form</h2>
        <form onSubmit={handleSubmit} className="shadow-lg p-5 lg:col-span-1">
          <div className="px-6 mx-6 my-4 py-4 text-left">
            <div className="mb-4">
              <label className="block mb-1" htmlFor="name">Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="cv">Upload your CV</label>
              <input type="file" id="cv" value={cv} onChange={(e) => setCv(e.target.value)} className="w-full" />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="language">Language</label>
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full">
                <option value="english">English</option>
                <option value="french">French</option>
                {/* Ajoutez d'autres langues selon vos besoins */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="motivation">Cover Letter</label>
              <textarea id="motivation" rows="4" value={motivation} onChange={(e) => setMotivation(e.target.value)} className="w-full"></textarea>
            </div>
            <div className="text-center">
            <button type="submit" className={`bg-red-800 text-white px-4 py-2 rounded-md 'border-2 border-red-800' : ''}`}>Apply Now</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
