import React , { useState, useRef }from "react";
import ReactAvatarEditor from "react-avatar-editor";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import React, { useState } from 'react';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

export default function Profile() {
  const [state, setState] = useState({
    image: "",
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 50,
    preview: null,
    width: 330,
    height: 330,
  });
  const [processedImage, setProcessedImage] = useState(null); // New state for processed image
  const [showEditor, setShowEditor] = useState(false); // New state for showing the editor

  const editorRef = useRef(null);

  const handleNewImage = (e) => {
    setState({ ...state, image: e.target.files[0] });
    setShowEditor(true); // Show the editor when a new image is selected

  };

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setState({ ...state, scale });
  };

  const handlePositionChange = (position) => {
    setState({ ...state, position });
  };
  
  const handleSubmit = async (e) => {
    if (editorRef.current) {
      const img = editorRef.current.getImageScaledToCanvas().toDataURL();
      setProcessedImage(img); 
      setShowEditor(false)// Set the processed image state

    }
  };
  return (
    <>
      <Navbar />
      <main className="profile-page bg-blueGray-200 relative w-full h-full py-40  ">
        <section className="py-16 ">
          <div className="container mx-auto px-4 mt-20">
            <div className=" flex flex-col min-w-0 break-words bg-white w-full  shadow-xl rounded-lg -mt-64">
              <div className="px-6">
              <div>
              {processedImage? <img src={processedImage} alt="Processed" />:       <div class="flex items-center justify-center w-full" >
  <label for="dropzone-file" class="flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
    <div style={{width:330,height:330}} class="flex flex-col items-center justify-center pt-5 pb-6">
      <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
      </svg>
      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span></p>
     
    </div>
    <input id="dropzone-file" type="file" class="hidden" onChange={handleNewImage} />
  </label>
</div>}
 
{showEditor && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3>Zoom</h3>
          <input
            name="scale"
            type="range"
            onChange={handleScale}
            min={state.allowZoomOut ? "0.1" : "1"}
            max="2"
            step="0.01"
            defaultValue="1"
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
              borderRadius={state.width / (100 / state.borderRadius)}
              image={state.image}
              color={[255, 255, 255, 0.6]}
              className="editor-canvas"
            />
          </div>
          <div>
            <button onClick={handleSubmit}>
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
      </div>
                    
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    Jenna Stones
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                    Los Angeles, California
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    University of Computer Science
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-lightBlue-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Companies card */}
            {/* ... Similar Companies code ... */}
          </div>
          {/* End of Left Side */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
