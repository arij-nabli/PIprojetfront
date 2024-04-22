import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Navbar from 'components/Navbars/IndexNavbar.js'
import Footer from 'components/Footers/Footer.js'
import HashLoader from 'react-spinners/HashLoader'
import { useNavigate } from 'react-router-dom'

export default function Experiences() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})
  const [experiences, setExperiences] = useState([])
  const [editModeExperiences, setEditModeExperiences] = useState(false)
  const [newExperienceVisible, setNewExperienceVisible] = useState(false)
  const [newExperience, setNewExperience] = useState('')
  const [isSaving, setIsSaving] = useState(false)

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

  const handleEditExperiences = () => {
    setEditModeExperiences(true)
  }

  const handleAddExperience = () => {
    setNewExperience('')
    setNewExperienceVisible(true)
  }

  const handleSaveExperiences = async () => {
    setIsSaving(true)
    try {
      let updatedExperiences = [...experiences]

      // Add new experience only if it is not empty
      if (newExperience.trim() !== '') {
        updatedExperiences.push(newExperience.trim())
      }

      const updatedUser = await axios.post(
        'http://localhost:5000/user/updateUserExperiences',
        {
          userId: user._id,
          experiences: updatedExperiences,
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

  const handleInputChange = (e) => {
    setNewExperience(e.target.value)
  }

  const handleChangeExperience = (index, newValue) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index] = newValue
    setExperiences(updatedExperiences)
    setNewExperience('')
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full mb-10'>
        <h2 className='text-2xl font-semibold leading-normal mt-4 mb-2 text-blueGray-700 mb-2'>
          Experiences
        </h2>
        <div className='mx-auto'>
          <div className='mb-2 text-blueGray-600'>
            {editModeExperiences ? (
              <div>
                {experiences.map((experience, index) => (
                  <div key={index} className='mb-4'>
                    <label
                      htmlFor={`experience-${index}`}
                      className='block mb-1'></label>
                    <input
                      type='text'
                      id={`experience-${index}`}
                      value={experience}
                      onChange={(e) =>
                        handleChangeExperience(index, e.target.value)
                      }
                      className='w-full border rounded-md px-3 py-2 mb-2'
                    />
                  </div>
                ))}
                {newExperienceVisible && (
                  <div className='mb-4'>
                    <label htmlFor='title-new' className='block mb-1'>
                      New Experience
                    </label>
                    <input
                      type='text'
                      id='title-new'
                      value={newExperience}
                      onChange={handleInputChange}
                      className='w-full border rounded-md px-3 py-2 mb-2'
                    />
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
                    onClick={() => setEditModeExperiences(false)}
                    className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className='mt-6 ml-6'>
                <ul>
                  {experiences.map((experience, index) => (
                    <li key={index} className='mb-4'>
                      <div>
                        <i
                          className='fa-solid fa-briefcase m-3 fa-xl'
                          style={{ color: '#9e0514' }}></i>
                        {experience}
                      </div>
                    </li>
                  ))}
                </ul>
                <button onClick={handleEditExperiences} className='mt-6'>
                  <i className='fa-solid fa-pen-to-square fa-xl ml-48'></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
