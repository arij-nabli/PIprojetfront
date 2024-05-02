import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Navbar from 'components/Navbars/IndexNavbar.js'
import Footer from 'components/Footers/Footer.js'
import HashLoader from 'react-spinners/HashLoader'
import { useNavigate } from 'react-router-dom'

export default function Educations(props) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})
  const [educations, setEducations] = useState([])
  const [editModeEducations, setEditModeEducations] = useState(false)
  const [newEducationVisible, setNewEducationVisible] = useState(false)
  const [newEducation, setNewEducation] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/getUserById/${props.id}`,
        
        )
        const userData = response.data
        setUser(userData)
        setEducations(userData.educations)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    fetchUserData()
  }, [token])

  const handleEditEducations = () => {
    setEditModeEducations(true)
  }

  const handleAddEducation = () => {
    setNewEducation('')
    setNewEducationVisible(true)
  }

  const handleSaveEducations = async () => {
    setIsSaving(true)
    try {
      let updatedEducations = [...educations]

      // Add new education only if it is not empty
      if (newEducation.trim() !== '') {
        updatedEducations.push(newEducation.trim())
      }

      const updatedUser = await axios.post(
        'http://localhost:5000/user/updateUserEducations',
        {
          userId: user._id,
          educations: updatedEducations,
        }
      )

      setUser(updatedUser.data.user)
      setEducations(updatedUser.data.user.educations)
      setIsSaving(false)
      setEditModeEducations(false)
      setNewEducationVisible(false)
    } catch (error) {
      console.error(error)
      setIsSaving(false)
    }
  }

  const handleInputChange = (e) => {
    setNewEducation(e.target.value)
  }

  const handleChangeEducation = (index, newValue) => {
    const updatedEducations = [...educations]
    updatedEducations[index] = newValue
    setEducations(updatedEducations)
    setNewEducation('')
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center w-full mb-10'>
        <h2 className='text-2xl font-semibold leading-normal mt-4 mb-2 text-blueGray-700 mb-2'>
          Education
        </h2>
        <div className='mx-auto'>
          <div className='mb-2 text-blueGray-600'>
            {editModeEducations ? (
              <div>
                {educations.map((education, index) => (
                  <div key={index} className='mb-4'>
                    <label
                      htmlFor={`education-${index}`}
                      className='block mb-1'></label>
                    <input
                      type='text'
                      id={`education-${index}`}
                      value={education}
                      onChange={(e) =>
                        handleChangeEducation(index, e.target.value)
                      }
                      className='w-full border rounded-md px-3 py-2 mb-2'
                    />
                  </div>
                ))}
                {newEducationVisible && (
                  <div className='mb-4'>
                    <label htmlFor='title-new' className='block mb-1'>
                      New Education
                    </label>
                    <input
                      type='text'
                      id='title-new'
                      value={newEducation}
                      onChange={handleInputChange}
                      className='w-full border rounded-md px-3 py-2 mb-2'
                    />
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
                    onClick={() => setEditModeEducations(false)}
                    className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className='mt-6 ml-6'>
                <ul>
                  {educations.map((education, index) => (
                    <li key={index} className='mb-4'>
                      <div>
                        <i
                          className='fa-solid fa-graduation-cap m-3 fa-xl'
                          style={{ color: '#9e0514' }}></i>
                        {education}
                      </div>
                    </li>
                  ))}
                </ul>
         {     props.isMyProfile &&  <button onClick={handleEditEducations} className='mt-6'>
                  <i className='fa-solid fa-pen-to-square fa-xl ml-48'></i>
                </button>}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
