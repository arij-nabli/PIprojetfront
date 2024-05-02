import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Experiences() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [editModeExperiences, setEditModeExperiences] = useState(false);
  const [newExperienceVisible, setNewExperienceVisible] = useState(false);
  const [newExperience, setNewExperience] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [cvData, setCvData] = useState(null); // State to store CV data
  const [cvExperiences, setCvExperiences] = useState([]); // State to store CV experiences

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/auth/getUserDataFromToken',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const userData = response.data.user
        setUser(userData)
        setExperiences(userData.experiences)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    fetchUserData()
  }, [token])
  
  useEffect(() => {
    const fetchCvData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pdf/parse-pdf');
        console.log(response.data);
        setCvData(response.data);
        if (response.data['EXPÉRIENCE PROFESSIONELLE']) {
          setCvExperiences(response.data['EXPÉRIENCE PROFESSIONELLE']);
        }
      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };
    fetchCvData();
  }, []);

  const handleEditExperiences = () => {
    setEditModeExperiences(true)
  }

  const handleAddExperience = () => {
    setNewExperience('');
    setNewExperienceVisible(true);
  }

  const handleSaveExperiences = async () => {
    setIsSaving(true)
    try {
      const updatedUser = await axios.post(
        'http://localhost:5000/user/updateUserExperiences',
        {
          userId: user._id,
          experiences: [...experiences, newExperience],
        }
      )

      setUser(updatedUser.data.user)
      setExperiences(updatedUser.data.user.experiences)
      setIsSaving(false)
      setEditModeExperiences(false)
      setNewExperienceVisible(false)
      setNewExperience('');
    } catch (error) {
      console.error(error)
      setIsSaving(false)
    }
  }

  const handleInputChange = (e) => {
    setNewExperience(e.target.value)
  }

  const handleChangeExperience = (index, newValue) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index] = newValue
    setExperiences(updatedExperiences)
  }
  
  const handleDeleteExperience = (index) => {
    const updatedExperiences = [...experiences]
    updatedExperiences.splice(index, 1)
    setExperiences(updatedExperiences)
  }

  const handleSaveCvExperiences = async () => {
    try {
      const updatedUser = await axios.post(
        'http://localhost:5000/user/updateUserExperiences',
        {
          userId: user._id,
          experiences: [...experiences, ...cvExperiences],
        }
      )
      setUser(updatedUser.data.user)
      setExperiences(updatedUser.data.user.experiences)
      setIsSaving(false)
      setEditModeExperiences(false)
      setNewExperienceVisible(false)
    } catch (error) {
      console.error(error)
      setIsSaving(false)
    }
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full mb-10'>
        <h2 className='text-2xl font-semibold leading-normal mt-4 mb-2 text-blueGray-700 '>
          Experiences
        </h2>
        <div>
          <div className='mx-auto'>
            <div className='mb-2 text-blueGray-600'>
              {editModeExperiences ? (
                <div>
                  <div>
                    {experiences.map((experience, index) => (
                      <div key={index} className='mb-4'>
                        <div className="flex items-center">
                          <i
                            className='fa-solid fa-briefcase m-3 fa-xl'
                            style={{ color: '#9e0514' }}></i>
                          <input
                            type='text'
                            value={experience}
                            onChange={(e) =>
                              handleChangeExperience(index, e.target.value)
                            }
                            className='w-full border rounded-md px-3 py-2 mb-2'
                          />
                          <button onClick={() => handleDeleteExperience(index)}>
                            <i className='fa-solid fa-trash fa-xl'></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {newExperienceVisible && (
                    <div className='mb-4'>
                      <div className="flex items-center">
                        <i
                          className='fa-solid fa-briefcase m-3 fa-xl'
                          style={{ color: '#9e0514' }}></i>
                        <input
                          type='text'
                          value={newExperience}
                          onChange={handleInputChange}
                          className='w-full border rounded-md px-3 py-2 mb-2'
                        />
                      </div>
                    </div>
                  )}
                  <button onClick={handleAddExperience}>
                    <i className='fa-solid fa-plus-square fa-xl'></i> Add
                    Experience
                  </button>
                  <div className='mt-4'>
                    <button
                      onClick={handleSaveExperiences}
                      disabled={isSaving}
                      className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleSaveCvExperiences}
                      disabled={isSaving}
                      className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                      {isSaving ? 'Saving CV Experiences...' : 'Save CV Experiences'}
                    </button>
                    <button
                      onClick={() => setEditModeExperiences(false)}
                      className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
 
                {experiences.map((experience, index) => (
                  <div key={index} className='mb-4'>
                    <div className="flex items-center">
                      <i
                        className='fa-solid fa-briefcase m-3 fa-xl'
                        style={{ color: '#9e0514' }}></i>
                     
                        {experience}
      
                      
                    </div>
                  </div>
                ))}
           
                  <button onClick={handleEditExperiences} className='mt-6'>
                    <i className='fa-solid fa-pen-to-square fa-xl ml-48'></i> Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Experiences;
