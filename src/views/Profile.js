import React , { useState, useRef }from "react";
import ReactAvatarEditor from "react-avatar-editor";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

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
  const [showMore, setShowMore] = useState(false); // New state variable

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
              <div class="flex items-center justify-center w-full mt-5" >
                {processedImage? <img src={processedImage} style={{width:230,height:230}} className="border-1 rounded-xl  border-black" alt="Processed" />:   
                  <label for="dropzone-file" class="flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-blue-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div style={{width:230,height:230}} class=" flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span></p>
                    
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" onChange={handleNewImage} />
                  </label>
                }</div>
          
                    
                <div className="text-center mt-2">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    Jenna Stones
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                    Los Angeles, California
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-3">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    University of Computer Science
                  </div>
                  
                </div>
                <div className="mt-10 py-10 border-t  border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
          An artist of considerable range, Jenna the name taken by
          Melbourne-raised, Brooklyn-based Nick Murphy writes,
          performs and records all of his own music, giving it a
          warm, intimate feel with a solid groove structure. An
          artist of considerable range.
  
        </p>
        <h2 className="text-2xl font-semibold leading-normal border-t pt-10 border-blueGray-200 mb-2 text-blueGray-700 mb-2">
                    Contact Information
                  </h2>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>{" "}
                    jenna.stones@example.com
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>
                    (123) 456-7890
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-twitter mr-2 text-lg text-blueGray-400"></i>
                    <a href="https://twitter.com/jenna_stones" className="text-blue-500 hover:text-blue-700">twitter.com/jenna_stones</a>
                  </div>
        
      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-col break-words bg-white w-full  shadow-xl rounded-lg mt-5">
            <div className="flex flex-row justify-between align-middle">
  <div className="flex flex-col items-center justify-center align-middle w-1/2">
    <h2 className="text-2xl font-semibold leading-normal text-blueGray-700 mb-2">
      Hard Skills
    </h2>
    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
      <i className="fas fa-code mr-2 text-lg text-blueGray-400"></i>{" "}
      JavaScript, React, Node.js
    </div>
    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
      <i className="fas fa-database mr-2 text-lg text-blueGray-400"></i>{" "}
      SQL, MongoDB
    </div>
    <div className="mb-2 text-blueGray-600">
      <i className="fas fa-cloud mr-2 text-lg text-blueGray-400"></i>
      AWS, Google Cloud
    </div>
  </div>
  <div className="flex flex-col items-center justify-center align-middle w-1/2 mb-5">
    <h2 className="text-2xl font-semibold leading-normal border-t pt-10 border-blueGray-200 mb-2 text-blueGray-700 mb-2">
      Soft Skills
    </h2>
    <div className="mb-2 text-blueGray-600">
      <i className="fas fa-tools mr-2 text-lg text-blueGray-400"></i>
      Project Management, Agile Scrum
    </div>
    <div className="mb-2 text-blueGray-600">
    <i className="fas fa-users mr-2 text-lg text-blueGray-400"></i>
    Teamwork, Collaboration
  </div>
  <div className="mb-2 text-blueGray-600">
    <i className="fas fa-comments mr-2 text-lg text-blueGray-400"></i>
    Communication, Negotiation
  </div>
  <div className="mb-2 text-blueGray-600">
    <i className="fas fa-brain mr-2 text-lg text-blueGray-400"></i>
    Problem Solving, Critical Thinking
  </div>
    {/* Add more soft skills here */}
  </div>
  
</div>
            
            </div>
            <div className=" flex flex-col break-words bg-white w-full  shadow-xl rounded-lg mt-5">
            <div className="flex flex-row justify-between align-middle">
            <div className="flex flex-col items-center justify-center align-middle w-full mb-10">
  <h2 className="text-2xl font-semibold leading-normal mt-4 mb-2 text-blueGray-700 mb-2">
    Experience
  </h2>
  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>{" "}
    Software Developer at XYZ Company (2018 - Present)
  </div>
  <div className="mb-2 text-blueGray-600">
    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
    Junior Developer at ABC Company (2016 - 2018)
  </div>
  <div className="mb-2 text-blueGray-600">
  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
  Junior Developer at ABC Company (2016 - 2018)
</div>
<div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>{" "}
  Intern at DEF Company (2015 - 2016)
</div>
<div className="mb-2 text-blueGray-600">
  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
  Freelance Web Developer (2014 - 2015)
</div>
  {/* Add more experiences here */}
</div>

              </div></div>
          </div>
        
        </section>
      </main>
      <Footer />
      {showEditor && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col justify-center align-middle items-center">
  <h3>Zoom</h3>
  <input
    name="scale"
    type="range"
    onChange={handleScale}
    min={state.allowZoomOut ? "0.1" : "1"}
    max="2"
    step="0.01"
    defaultValue="1"
    className="appearance-none h-3 w-full bg-blue-200 rounded-full outline-none slider-thumb"
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
    <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 mt-5 text-white font-bold py-2 px-4 rounded">
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