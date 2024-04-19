import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cv() {
  const [formData, setFormData] = useState({
    cvFile: null,
    user: {},
    token: localStorage.getItem('token'),
    isLoading: true,
  });

  const navigate = useNavigate();

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateUserCV(formData.user._id, formData.cvFile, formData.token);
      console.log(response.data);
      // Afficher un message de succès ici si nécessaire
    } catch (error) {
      console.error(error);
      // Afficher un message d'erreur ici si nécessaire
    }
  };

  // Fonction pour mettre à jour le CV de l'utilisateur
  const updateUserCV = async (userId, cvFile, token) => {
    const formData = new FormData();
    formData.append('cv', cvFile);

    return await axios.post(
      `http://localhost:5000/user/update-cv?id=${userId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  // Fonction pour gérer l'affichage du CV
 // Fonction pour gérer l'affichage du CV
const handleViewCV = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/user/cv/${formData.user._id}`,
      {
        responseType: 'arraybuffer', // Utilise responseType 'arraybuffer' au lieu de 'blob'
      }
    );

    const file = new Blob([response.data], { type: 'application/pdf' }); // Crée un objet Blob pour le fichier
    const fileURL = URL.createObjectURL(file);

    // Vérifie si le fichier est une image
    if (file.type.includes('image')) {
      // Affiche le fichier dans un élément <img>
      const image = new Image();
      image.src = fileURL;
      const newWindow = window.open('');
      newWindow.document.write(image.outerHTML);
    } else {
      // Ouvre le fichier dans une nouvelle fenêtre
      window.open(fileURL);
      console.log(fileURL)
    }
  } catch (error) {
    console.error(error);
    // Afficher un message d'erreur ici si nécessaire
  }
};

  // Fonction pour récupérer les données de l'utilisateur
  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/auth/getUserDataFromToken',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      const userData = response.data.user;
      setFormData({ ...formData, user: userData, isLoading: false });
    } catch (error) {
      console.error(error);
      setFormData({ ...formData, isLoading: false });
    }
  };

  // Effet pour récupérer les données de l'utilisateur lors du chargement du composant
  useEffect(() => {
    fetchUserData(formData.token);
  }, [formData.token]);

  return (
    <div className="container mx-auto px-4 h-full flex justify-center items-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold">CV area</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-4 w-full">
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, cvFile: e.target.files[0] })
                }
                className="hidden"
              />
              <span className="text-lg">
                {formData.cvFile ? formData.cvFile.name : 'Upload your CV'}
              </span>
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ml-4"
            >
              Save
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={handleViewCV}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
          >
            View CV
          </button>
        </div>
      </div>
    </div>
  );
}
