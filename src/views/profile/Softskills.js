import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Softskills(props) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})
  const [softskills, setSoftskills] = useState([])
  const [editModeSoftskills, setEditModeSoftskills] = useState(false)
  const [newSoftskillVisible, setNewSoftskillVisible] = useState(false)
  const [newSoftskill, setNewSoftskill] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `esprit-compass-backend.vercel.app/user/getUserById/${props.id}`,
        
        )
        const userData = response.data
        setUser(userData)
        setSoftskills(userData.softskills)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }
    fetchUserData()
  }, [token])

  const handleEditSoftskills = () => {
    setEditModeSoftskills(true)
  }

  const handleAddSoftskill = () => {
    setNewSoftskill('')
    setNewSoftskillVisible(true)
  }

  const handleSaveSoftskills = async () => {
    setIsSaving(true)
    try {
      let updatedSoftskills = [...softskills]

      // Add new softskill only if it is not empty
      if (newSoftskill.trim() !== '') {
        updatedSoftskills.push(newSoftskill.trim())
      }

      const updatedUser = await axios.post(
        'esprit-compass-backend.vercel.app/user/updateUserSoftskills',
        {
          userId: user._id,
          softskills: updatedSoftskills,
        }
      )

      setUser(updatedUser.data.user)
      setSoftskills(updatedUser.data.user.softskills)
      setIsSaving(false)
      setEditModeSoftskills(false)
      setNewSoftskillVisible(false)
    } catch (error) {
      console.error(error)
      setIsSaving(false)
    }
  }

  const handleInputChange = (e) => {
    setNewSoftskill(e.target.value)
  }

  const handleChangeSoftskill = (index, newValue) => {
    const updatedSoftskills = [...softskills]
    updatedSoftskills[index] = newValue
    setSoftskills(updatedSoftskills)
    setNewSoftskill('')
  }

  const handleDeleteSoftskill = (index) => {
    const updatedSoftskills = [...softskills]
    updatedSoftskills.splice(index, 1)
    setSoftskills(updatedSoftskills)
  }

  return (
    <>
      <h2 className='text-2xl font-semibold leading-normal mt-4 mb-2 text-blueGray-700 mb-2'>
        SoftSkills
      </h2>
      <div className='mx-auto'>
        <div className='mb-2 text-blueGray-600'>
          {editModeSoftskills ? (
            <div>
              {softskills.map((softskill, index) => (
                <div key={index} className='mb-4 flex items-center'>
                  <input
                    type='text'
                    id={`softskill-${index}`}
                    value={softskill}
                    onChange={(e) =>
                      handleChangeSoftskill(index, e.target.value)
                    }
                    className='w-full border rounded-md px-3 py-2 mb-2 mr-2'
                  />
                  <button onClick={() => handleDeleteSoftskill(index)}>
                    <i className='fa-solid fa-trash fa-xl'></i>
                  </button>
                </div>
              ))}
              {newSoftskillVisible && (
                <div className='mb-4'>
                  <label htmlFor='title-new' className='block mb-1'>
                    New SoftSkill
                  </label>
                  <input
                    type='text'
                    id='title-new'
                    value={newSoftskill}
                    onChange={handleInputChange}
                    className='w-full border rounded-md px-3 py-2 mb-2'
                  />
                </div>
              )}
              <button onClick={handleAddSoftskill}>
                <i className='fa-solid fa-plus-square fa-xl'></i> Add SoftSkill
              </button>
              <div className='mt-4'>
                <button
                  onClick={handleSaveSoftskills}
                  disabled={isSaving}
                  className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setEditModeSoftskills(false)}
                  className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className=' '>
              <ul>
                {softskills.map((softskill, index) => (
                  <li key={index} className='mb-4'>
                    <div>
                      <i
                        className='fa-solid fa-thumbs-up m-3 fa-xl'
                        style={{ color: '#9e0514' }}></i>
                      {softskill}
                    </div>
                  </li>
                ))}
              </ul>
         {  props.isMyProfile &&   <button onClick={handleEditSoftskills} className='mt-6'>
                <i className='fa-solid fa-pen-to-square fa-xl ml-48'></i>
              </button>}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
