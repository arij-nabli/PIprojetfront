import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Educations(props) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [educations, setEducations] = useState([]);
  const [editModeEducations, setEditModeEducations] = useState(false);
  const [newEducationVisible, setNewEducationVisible] = useState(false);
  const [newEducation, setNewEducation] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [cvData, setCvData] = useState(null); // State to store CV data
  const [cvEducations, setCvEducations] = useState([]); // State to store CV educations

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `esprit-compass-backend.vercel.app/user/getUserById/${props.id}`,
        
        )
        const userData = response.data
        setUser(userData);
        setEducations(userData.educations);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [token]);

  useEffect(() => {
    const fetchCvData = async () => {
      try {
        const response = await axios.get('esprit-compass-backend.vercel.app/pdf/parse-pdf');
        console.log(response.data);
        setCvData(response.data);
        if (response.data['FORMATION']) {
          setCvEducations(response.data['FORMATION']);
        }
      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };
    fetchCvData();
  }, []);

  const handleEditEducations = () => {
    setEditModeEducations(true);
  };

  const handleAddEducation = () => {
    setNewEducation('');
    setNewEducationVisible(true);
  };

  const handleSaveEducations = async () => {
    setIsSaving(true);
    try {
      let updatedEducations = [...educations];
  
      // Add new education only if it is not empty and not already included
      if (newEducation.trim() !== '' && !educations.includes(newEducation.trim())) {
        updatedEducations.unshift(newEducation.trim());
      }
  
      const updatedUser = await axios.post(
        'esprit-compass-backend.vercel.app/user/updateUserEducations',
        {
          userId: user._id,
          educations: updatedEducations,
        }
      );
  
      setUser(updatedUser.data.user);
      setEducations(updatedUser.data.user.educations);
      setIsSaving(false);
      setEditModeEducations(false);
      setNewEducationVisible(false);
  
      setNewEducation('');
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };
  

  const handleInputChange = (e) => {
    setNewEducation(e.target.value);
  };

  const handleChangeEducation = (index, newValue) => {
    const updatedEducations = [...educations];
    updatedEducations[index] = newValue;
    setEducations(updatedEducations);
  };

  const handleDeleteEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

  const handleSaveCvEducations = async () => {
    setIsSaving(true);
    try {
      const updatedUser = await axios.post(
        'esprit-compass-backend.vercel.app/user/updateUserEducations',
        {
          userId: user._id,
          educations: [...educations, ...cvEducations],
        }
      );
      setUser(updatedUser.data.user);
      setEducations(updatedUser.data.user.educations);
      setIsSaving(false);
      setEditModeEducations(false);
      setNewEducationVisible(false);
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full mb-10'>
        <h2 className='text-2xl font-semibold leading-normal mt-4 mb-2 text-blueGray-700 '>
          Education
        </h2>
        <div>
          <div className='mx-auto'>
            <div className='mb-2 text-blueGray-600'>
              {editModeEducations ? (
                <div>
                  <div>
                    {educations.map((education, index) => (
                      <div key={index} className='mb-4'>
                        <div className="flex items-center">
                          
                            <i
                              className='fa-solid fa-briefcase m-3 fa-xl'
                              style={{ color: '#9e0514' }}></i>
                        
                          <input
                            type='text'
                            value={education}
                            onChange={(e) =>
                              handleChangeEducation(index, e.target.value)
                            }
                            className='w-full border rounded-md px-3 py-2 mb-2'
                          />
                          <button onClick={() => handleDeleteEducation(index)}>
                            <i className='fa-solid fa-trash fa-xl'></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {newEducationVisible && (
                    <div className='mb-4'>
                      <div className="flex items-center">
                        
                          <i
                            className='fa-solid fa-briefcase m-3 fa-xl'
                            style={{ color: '#9e0514' }}></i>
                    
                        <input
                          type='text'
                          value={newEducation}
                          onChange={handleInputChange}
                          className='w-full border rounded-md px-3 py-2 mb-2'
                        />
                      </div>
                    </div>
                  )}
                  <button onClick={handleAddEducation}>
                    <i className='fa-solid fa-plus-square fa-xl'></i> Add
                    Education
                  </button>
                  <div className='mt-4'>
                    <button
                      onClick={handleSaveEducations}
                      disabled={isSaving}
                      className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleSaveCvEducations}
                      disabled={isSaving}
                      className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                      {isSaving ? 'Saving CV Educations...' : 'Save CV Educations'}
                    </button>
                    <button
                      onClick={() => setEditModeEducations(false)}
                      className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
 
                {educations.map((education, index) => (
                  <div key={index} className='mb-4'>
                    <div className="flex items-center">
                     
                        <i
                          className='fa-solid fa-briefcase m-3 fa-xl'
                          style={{ color: '#9e0514' }}></i>
                    
                      {education}
                    </div>
                  </div>
                ))}
           
           {     props.isMyProfile &&  <button onClick={handleEditEducations} className='mt-6'>
                  <i className='fa-solid fa-pen-to-square fa-xl ml-48'></i>
                </button>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Educations;
