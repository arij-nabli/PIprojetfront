import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import companyphoto from "../../../src/assets/img/companyphoto.png"
import UpdateProfileCompany from "./UpdateProfileCompany";
import ReactAvatarEditor from 'react-avatar-editor'

  export default function ProfileCompany() {
    const [processedImage, setProcessedImage] = useState(null)
    const [showEditor, setShowEditor] = useState(false) // New state for showing the editor
    const [companyPhoto, setCompanyPhoto] = useState(companyphoto);
    const [showModal, setShowModal] = useState();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    const [token, setToken] = useState(localStorage.getItem("token")); 
    const Modif = (name, description, country, secteurActivite, adresse, telephone) => {
      // Vous pouvez traiter les informations de l'entreprise ici
      console.log("Les informations de l'entreprise sont :", name, description, country, secteurActivite, adresse, telephone);
      // Par exemple, vous pouvez effectuer une requête axios pour envoyer les données au serveur
      // axios.post('votre_url_de_mise_à_jour', { name, description, country, secteurActivite, adresse, telephone })
    };
   
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [country, setCountry] = useState();
    const [industry, setIndutry] = useState();
    const [adresse, setAdresse] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [description, setDescription] = useState(
      
    );
    
    const handleNewImage = (e) => {
      setState({ ...state, image: e.target.files[0] })
      setShowEditor(true) 
    }
  
    const handleToggleForm = () => {
     
      setShowApplicationForm(!showApplicationForm);
    };
  
    const [state, setState] = useState({
      image: "",
      allowZoomOut: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 50,
      preview: null,
      width: 500,
      height: 500,
    });
    const handleScale = (e) => {
      const scale = parseFloat(e.target.value)
      setState({ ...state, scale })
    }
    const handlePositionChange = (position) => {
      setState({ ...state, position })
    }
    const handleSubmit = async (e) => {
      if (editorRef.current) {
        const img = editorRef.current.getImageScaledToCanvas().toDataURL();
     
        setCompanyPhoto(img); 
        setShowEditor(false); 
        const response1 = await fetch(img);
      const blob = await response1.blob();
       const formData = new FormData();
       formData.append('image', blob, 'companyphoto'); // append the blob with a filename
      const response = await axios.post(`esprit-compass-backend.vercel.app/user/update-image?id=${user._id}`, formData)
      .then((response) => {
         console.log(response.data);
         
         setCompanyPhoto(img); 
         setShowEditor(false);
      }).catch((error) => {
         console.error(error);
         setShowEditor(false);
      }) 
      }
    };
    
    const editorRef = useRef(null)
  
  useEffect(() => {
    console.log("showModal value:", showModal);
  }, [showModal]);
  useEffect(() => {
        
    const token = localStorage.getItem('token');
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "esprit-compass-backend.vercel.app/auth/getUserDataFromToken",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
          if (response.data.user.role !== "company"){
            navigate("/auth/login")
          }
          else{
            const userData = response.data;
            
            const companyData = userData.data; 
            
            setName(response.data.user.username);
           setDescription(companyData.description);
            setCountry(response.data.user.country);
           setAdresse(companyData.location);
           setPhone(companyData.phone);
           setIndutry(companyData.industry);
            setUser(response.data.user);
            setEmail(response.data.user.email);
           
            console.log(companyData);
         
            getProfileImage(response.data.user._id);
            console.log(response.data.company);
            setIsLoading(false);
          }
      } catch (error) {
        console.error(error);
         setIsLoading(false);
      }
    };
  
    const getProfileImage = async (id) => {
      try {
        const response = await axios.get(
          `esprit-compass-backend.vercel.app/user/get-image?id=${id}`,
          { responseType: 'blob' } 
        );
        const imageUrl = URL.createObjectURL(response.data);
       
        setCompanyPhoto(imageUrl); 
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchUserData();
    
  }, [token]);
  
    return (
      <>
  <section className="h-full">
    <div className="container mx-auto px-4 h-full">
      <div className="flex w-full justify-between h-full flex-col">
        <div className="mx-4 mt-2">
          <h3 className="text-3xl font-semibold leading-normal mb-3 text-blueGray-700 text-left">
            Company information:
            <button onClick={handleToggleForm} className="text-white rounded-full p-2">
              <i style={{ color: "#BD2C43" }} className="fa-solid fa-file-pen"></i>
            </button>
          </h3>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center break-words bg-white shadow-xl rounded-lg">
        <div className="flex flex-col items-center pt-13 mx-10 lg:w-1/2">
    <div className="relative mt-5 mb-5">
      <img
        src={companyPhoto}
        style={{ width: "100%", height: "auto" }}
        className="mt-5 mb-5 border-1 shadow border-black"
        alt="logo company"
      />
      <div className="input-group">
        <button className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full  bg-white hover:bg-gray-100 border border-gray-700" onClick={() => document.getElementById('eventImage').click()}>
          <i className="fa-solid fa-image" style={{ color: "#BD2C43" }}></i> 
        </button>
        <input type="file" id="eventImage" name="event_img" onChange={handleNewImage} accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />
      </div>
    </div>
  
          </div>
          <div className="mx-8 mt-2 lg:w-1/2">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-semibold leading-normal mt-4 mb-2 text-blueGray-700">
                {name}
              </h2>
            </div>
            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
              {description}
            </p>
            <div className="mb-2 text-blueGray-600">
              <i style={{color:"#BD2C43"}} className="fa-solid fa-earth-europe mr-2 text-lg text-blueGray-400"></i> {country}
            </div>
            <div className="mb-2 text-blueGray-600"> 
              <i style={{color:"#BD2C43"}} className="fa-solid fa-envelope mr-2 text-lg text-blueGray-400"></i> {email}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i style={{color:"#BD2C43"}} className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i> {industry}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i style={{color:"#BD2C43"}} className="fa-solid fa-location-dot mr-3 text-lg text-blueGray-400"></i> {adresse}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i style={{color:"#BD2C43"}} className="fas fa-phone mr-2 text-lg text-blueGray-400"></i> {phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  {showApplicationForm && (
    <UpdateProfileCompany
    onClose={handleToggleForm}
    onSubmit={(companyData) => {
      handleToggleForm(companyData);
      window.location.reload(); 
    }} 
    companyData={{
      _id: user._id,
      username: name,
      description: description,
      country: country,
     industry: industry,
      location: adresse,
      phone: phone,
      email:email,
   
    }}
  />
    )}
        {showEditor && (
              <div className='fixed z-10 inset-0 overflow-y-auto'>
                <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                  <div
                    className='fixed inset-0 transition-opacity'
                    aria-hidden='true'>
                    <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                  </div>
                  <span
                    className='hidden sm:inline-block sm:align-middle sm:h-screen'
                    aria-hidden='true'>
                    &#8203;
                  </span>
                  <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                    <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col justify-center align-middle items-center'>
                      <h3>Zoom</h3>
                      <input
                        name='scale'
                        type='range'
                        onChange={handleScale}
                        min={state.allowZoomOut ? '0.1' : '1'}
                        max='2'
                        step='0.01'
                        defaultValue='1'
                        className='appearance-none h-3 w-full bg-blue-200 rounded-full outline-none slider-thumb'
                      />
                      <div>
                      <ReactAvatarEditor
    ref={editorRef}
    scale={parseFloat(state.scale)}
    width={state.width}
    height={state.height}
    position={state.position}
    onPositionChange={handlePositionChange}
    rotate={parseFloat(state.rotate)}
    image={state.image}
    color={[255, 255, 255, 0.6]}
    className='editor-canvas'
  />
                      </div>
                      <div>
                        <button
                          onClick={handleSubmit}
                          className='bg-blue-500 hover:bg-blue-700 mt-5 text-white font-bold py-2 px-4 rounded'>
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
      </>
      
  
    );
  }