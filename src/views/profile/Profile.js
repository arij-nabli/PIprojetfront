import React, { useState, useRef, useEffect } from 'react'
import ReactAvatarEditor from 'react-avatar-editor'
import axios from 'axios'
import Navbar from 'components/Navbars/IndexNavbar.js'
import Footer from 'components/Footers/Footer.js'
import { useNavigate } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import Experiences from './Experiences'
import Educations from './Educations'
import Softskills from './Softskills'
import Cv from './Cv'

export default function Profile() {
  const [state, setState] = useState({
    image: '',
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 50,
    preview: null,
    width: 330,
    height: 330,
  })
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [processedImage, setProcessedImage] = useState(null) // New state for processed image
  const [showEditor, setShowEditor] = useState(false) // New state for showing the editor
  const [showMore, setShowMore] = useState(false) // New state variable

  const [country, setCountry] = useState('Tunisia')
  const [suggestedSkills, setSuggestedSkills] = useState([])
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const editorRef = useRef(null)
  const [skillInput, setSkillInput] = useState('')
  const handleSkillInputChange = async (event) => {
    setSkillInput(event.target.value)
    if (event.target.value.length > 0) {
      const response = await fetch(
        `http://localhost:5000/skills/search?start=${event.target.value}`
      )
      const skills = await response.json()
      setSuggestedSkills(skills.map((skill) => skill.name))
      // Now `skills` contains the skills starting with the input value.
      // You can set them in the state and display them as suggestions.
    } else setSuggestedSkills([]) // Clear the suggestions when the input is empty
  }
  const handleSkillClick = async (skill) => {
    setSkillInput(skill)
    setHardSkillInfo({
      ...hardSkillInfo,
      hardSkills: [...hardSkillInfo.hardSkills, skill],
    })
    setSuggestedSkills([])
  }
  const handleNewImage = async (e) => {
    setState({ ...state, image: e.target.files[0] })
    setShowEditor(true) // Show the editor when a new image is selected
  }
  const handleReplaceImage = () => {
    // Reset the processed image state and show the file input
    setProcessedImage(null)
    setShowEditor(false)
    document.getElementById('dropzone-file').click()
  }
  const [editModeHardSkill, setEditModeHardSkill] = useState(false)

  const [hardSkillInfo, setHardSkillInfo] = useState({
    hardSkills: [''],
  })

  const handleEditHardSkill = () => {
    setEditModeHardSkill(true)
  }

  const handleSaveHardSkill = () => {
    // Save the updated contact information
    setEditModeHardSkill(false)
  }

  const handleChangeHardSkill = (e) => {
    const { name, value } = e.target
    setEditModeHardSkill({ ...hardSkillInfo, [name]: value })
  }

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    setState({ ...state, scale })
  }

  const handlePositionChange = (position) => {
    setState({ ...state, position })
  }

  const handleSubmit = async (e) => {
    if (editorRef.current) {
      const img = editorRef.current.getImageScaledToCanvas().toDataURL()
      setProcessedImage(img)
      setShowEditor(false)
      const response1 = await fetch(img)
      const blob = await response1.blob()
      const formData = new FormData()
      formData.append('image', blob, 'profile.jpg') // append the blob with a filename

      // Send the image to the server
      const response = await axios
        .post(
          `http://localhost:5000/user/update-image?id=${user._id}`,
          formData
        )
        .then((response) => {
          console.log(response.data)
          setShowEditor(false)
        })
        .catch((error) => {
          console.error(error)
          setShowEditor(false)
        })
    }
  }
  useEffect(() => {
    // Inside fetchUserData function:
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
        console.log(response.data)
        const userData = response.data.user
        setUser(userData)
        setContactInfo({
          // Set contactInfo state with fetched user data
          fullName: userData.username,
          phone: userData.phone,
          email: userData.email,
        })
        getProfileImage(userData._id)
        setName(userData.username)
        setEmail(response.data.user.email)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    const getProfileImage = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/get-image?id=${id}`,
          { responseType: 'blob' }
        )
        const imageUrl = URL.createObjectURL(response.data)
        setProcessedImage(imageUrl)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserData()
  }, [token])

  //------------------Description Logic---------------------------//
  const [description, setDescription] = useState('')
  const [editModeDescription, setEditModeDescription] = useState(false)

  const handleEditDescription = () => {
    setEditModeDescription(true)
    setDescription(user.description) // Set the description from user state
  }

  const handleSaveDescription = async () => {
    try {
      await axios.put('http://localhost:5000/user/updateDescription', {
        id: user._id,
        description,
      })
      // Update user state with the new description
      setUser((prevUser) => ({
        ...prevUser,
        description: description,
      }))
      setEditModeDescription(false)
    } catch (error) {
      console.error(error)
      // Handle error
    }
  }

  //----------------------English-------------------------------//
  const [englishLevel, setEnglishLevel] = useState(
    localStorage.getItem('englishLevel') || 0
  )
  const [editModeEnglish, setEditModeEnglish] = useState(false)

  useEffect(() => {
    localStorage.setItem('englishLevel', englishLevel)
  }, [englishLevel])

  const handleEditEnglish = () => {
    setEditModeEnglish(true)
  }

  const handleSaveEnglish = async () => {
    try {
      await axios.put('http://localhost:5000/user/updateUserEnglish', {
        id: user._id,
        english: englishLevel,
      })
      // Update user state with the new english level
      setUser((prevUser) => ({
        ...prevUser,
        english: englishLevel,
      }))
      setEditModeEnglish(false)
    } catch (error) {
      console.error(error)
      // Handle error
    }
  }

  // Calculate the background color based on the english level
  const progressBarColorE = `linear-gradient(to right, red 0%, red ${englishLevel}%, #e5e7eb ${englishLevel}%, #e5e7eb 100%)`
  //--------------------------Arabic--------------------------------//
  const [arabicLevel, setArabicLevel] = useState(
    localStorage.getItem('arabicLevel') || 0
  )
  const [editModeArabic, setEditModeArabic] = useState(false)

  useEffect(() => {
    localStorage.setItem('arabicLevel', arabicLevel)
  }, [arabicLevel])

  const handleEditArabic = () => {
    setEditModeArabic(true)
  }

  const handleSaveArabic = async () => {
    try {
      await axios.put('http://localhost:5000/user/updateUserArabic', {
        id: user._id,
        arabic: arabicLevel,
      })
      // Update user state with the new arabic level
      setUser((prevUser) => ({
        ...prevUser,
        arabic: arabicLevel,
      }))
      setEditModeArabic(false)
    } catch (error) {
      console.error(error)
      // Handle error
    }
  }

  // Calculate the background color based on the arabic level
  const progressBarColorA = `linear-gradient(to right, red 0%, red ${arabicLevel}%, #e5e7eb ${arabicLevel}%, #e5e7eb 100%)`
  //--------------------------French--------------------------------//
  const [frenchLevel, setFrenchLevel] = useState(
    localStorage.getItem('frenchLevel') || 0
  )
  const [editModeFrench, setEditModeFrench] = useState(false)

  useEffect(() => {
    localStorage.setItem('frenchLevel', frenchLevel)
  }, [frenchLevel])

  const handleEditFrench = () => {
    setEditModeFrench(true)
  }

  const handleSaveFrench = async () => {
    try {
      await axios.put('http://localhost:5000/user/updateUserFrench', {
        id: user._id,
        french: frenchLevel,
      })
      // Update user state with the new french level
      setUser((prevUser) => ({
        ...prevUser,
        french: frenchLevel,
      }))
      setEditModeFrench(false)
    } catch (error) {
      console.error(error)
      // Handle error
    }
  }
  // Calculate the background color based on the french level
  const progressBarColor = `linear-gradient(to right, red 0%, red ${frenchLevel}%, #e5e7eb ${frenchLevel}%, #e5e7eb 100%)`
  //------------------Contact Information Logic---------------------------//
  const [contactInfo, setContactInfo] = useState({
    fullName: user.username, // Set initial value to user's username
    phone: user.phone, // Set initial value to user's phone
    email: user.email,
  })
  const [editModeContactInfo, setEditModeContactInfo] = useState(false)

  const handleEditContactInfo = () => {
    setEditModeContactInfo(true)
  }

  const handleSaveContactInfo = async () => {
    try {
      await axios.put('http://localhost:5000/user/updateContactInfo', {
        id: user._id,
        username: contactInfo.fullName, // Send updated username
        phone: contactInfo.phone, // Send updated phone
      })
      setEditModeContactInfo(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeContactInfo = (e) => {
    const { name, value } = e.target
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }))
  }

  return (
    <>
      {isLoading ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <HashLoader
            color={'#BD2C43'}
            loading={isLoading}
            size={150}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      ) : (
        <>
          <Navbar />
          <main
            className='profile-pagerelative w-full h-full py-10 text-center'
            style={{
              'background-color': '#DFDBE5',
            }}>
            <section className='h-full '>
              <div className='container mx-auto px-4 h-full'>
                <div className='flex w-full justify-between h-full '>
                  <input
                    id='dropzone-file'
                    type='file'
                    class='hidden'
                    onChange={handleNewImage}
                  />
                  <div
                    className=' flex flex-col min-w-0 break-words bg-white shadow-xl rounded-lg '
                    style={{ width: '35%' }}>
                    <div className='flex flex-col'>
                      <div class='flex items-center justify-center w-full '>
                        {processedImage ? (
                          <>
                            <img
                              src={processedImage}
                              style={{ width: 230, height: 230 }}
                              className='mt-5 border-1 shadow rounded-full  border-black'
                              alt='Processed'
                            />
                          </>
                        ) : (
                          <label
                            for='dropzone-file'
                            class='flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-blue-200 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mt-5 rounded-full '>
                            <div
                              style={{ width: 230, height: 230 }}
                              class=' flex flex-col items-center justify-center pt-5 pb-6'>
                              <svg
                                class='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 20 16'>
                                <path
                                  stroke='currentColor'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                                />
                              </svg>
                              <p class='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                <span class='font-semibold'>
                                  Click to upload
                                </span>
                              </p>
                            </div>
                          </label>
                        )}
                      </div>
                      <button
                        onClick={handleReplaceImage}
                        className='bg-transparent border-none cursor-pointer ml-48'>
                        <i class='fa-solid fa-camera-retro'></i>
                      </button>
                      {/*----------------------Description-------------------------------- */}
                      <div className=' mt-2'>
                        <div className=' p-4 rounded-md '>
                          <h2 className='text-lg font-semibold mb-4'>
                            Description
                          </h2>
                          {editModeDescription ? (
                            <div>
                              <label
                                htmlFor='description'
                                className='block mb-1'>
                                Description
                              </label>
                              <input
                                type='text'
                                id='description'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='w-full border rounded-md px-3 py-2 mb-2'
                              />
                              <div className='mt-4'>
                                <button
                                  onClick={handleSaveDescription}
                                  className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditModeDescription(false)}
                                  className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p>{user.description}</p>{' '}
                              {/* Access description from user state */}
                              <button onClick={handleEditDescription}>
                                <i className='fa-solid fa-pen-to-square fa-xl ml-60 mt-6'></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {/*------------------Contact Info------------------------- */}
                      <div className='mt-2'>
                        <div className='p-4 rounded-md'>
                          <h2 className='text-lg font-semibold mb-4'>
                            Contact Information
                          </h2>
                          {editModeContactInfo ? (
                            <div>
                              <label htmlFor='fullName' className='block mb-1'>
                                Full Name
                              </label>
                              <input
                                type='text'
                                id='fullName'
                                name='fullName'
                                value={contactInfo.fullName}
                                onChange={handleChangeContactInfo}
                                className='w-full border rounded-md px-3 py-2 mb-2'
                              />

                              <label htmlFor='phone' className='block mb-1'>
                                Phone
                              </label>
                              <input
                                type='text'
                                id='phone'
                                name='phone'
                                value={contactInfo.phone}
                                onChange={handleChangeContactInfo}
                                className='w-full border rounded-md px-3 py-2 mb-2'
                              />
                              <div className='mt-4'>
                                <button
                                  onClick={handleSaveContactInfo}
                                  className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditModeContactInfo(false)}
                                  className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p>
                                <i
                                  className='fa-regular fa-user mr-3'
                                  style={{ color: '#BD2C43' }}></i>
                                {contactInfo.fullName}
                              </p>
                              <p>
                                <i
                                  className='fa-regular fa-envelope mr-3 '
                                  style={{ color: '#BD2C43' }}></i>
                                {contactInfo.email}
                              </p>
                              <p>
                                <i
                                  className='fa-solid fa-phone mr-3'
                                  style={{ color: '#BD2C43' }}></i>
                                {contactInfo.phone}
                              </p>
                              <button onClick={handleEditContactInfo}>
                                <i className='fa-solid fa-pen-to-square fa-xl ml-60 mt-6'></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/*------------------------------French-----------------------------------*/}
                      <div className='mt-2'>
                        <div className='p-4 rounded-md'>
                          <h2 className='text-lg font-semibold mb-4'>French</h2>
                          {editModeFrench ? (
                            <div>
                              <label
                                htmlFor='frenchLevel'
                                className='block mb-1'>
                                French Level
                              </label>
                              <input
                                type='range'
                                id='frenchLevel'
                                name='frenchLevel'
                                min='0'
                                max='100'
                                value={frenchLevel}
                                onChange={(e) =>
                                  setFrenchLevel(Number(e.target.value))
                                }
                                className='w-full border rounded-md px-3 py-2 mb-2'
                              />
                              <div className='mt-4'>
                                <button
                                  onClick={handleSaveFrench}
                                  className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditModeFrench(false)}
                                  className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div
                                className='h-4 rounded-md overflow-hidden'
                                style={{ background: progressBarColor }}>
                                <div
                                  className='h-full bg-red-500'
                                  style={{ width: `${frenchLevel}%` }}>
                                  <div className='h-4 w-4 bg-red-500 rounded-full' />
                                </div>
                              </div>
                              <button onClick={handleEditFrench}>
                                <i className='fa-solid fa-pen-to-square fa-xl ml-60 mt-6'></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {/*-------------------------------English----------------------------------*/}
                      <div className='mt-2'>
                        <div className='p-4 rounded-md'>
                          <h2 className='text-lg font-semibold mb-4'>
                            English
                          </h2>
                          {editModeEnglish ? (
                            <div>
                              <label
                                htmlFor='englishLevel'
                                className='block mb-1'>
                                English Level
                              </label>
                              <input
                                type='range'
                                id='englishLevel'
                                name='englishLevel'
                                min='0'
                                max='100'
                                value={englishLevel}
                                onChange={(e) =>
                                  setEnglishLevel(Number(e.target.value))
                                }
                                className='w-full border rounded-md px-3 py-2 mb-2'
                              />
                              <div className='mt-4'>
                                <button
                                  onClick={handleSaveEnglish}
                                  className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditModeEnglish(false)}
                                  className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div
                                className='h-4 rounded-md overflow-hidden'
                                style={{ background: progressBarColorE }}>
                                <div
                                  className='h-full bg-red-500'
                                  style={{ width: `${englishLevel}%` }}>
                                  <div className='h-4 w-4 bg-red-500 rounded-full' />
                                </div>
                              </div>
                              <button onClick={handleEditEnglish}>
                                <i className='fa-solid fa-pen-to-square fa-xl ml-60 mt-6'></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {/*-------------------------Arabic------------------------------------ */}
                      <div className='mt-2'>
                        <div className='p-4 rounded-md'>
                          <h2 className='text-lg font-semibold mb-4'>Arabic</h2>
                          {editModeArabic ? (
                            <div>
                              <label
                                htmlFor='arabicLevel'
                                className='block mb-1'>
                                Arabic Level
                              </label>
                              <input
                                type='range'
                                id='arabicLevel'
                                name='arabicLevel'
                                min='0'
                                max='100'
                                value={arabicLevel}
                                onChange={(e) =>
                                  setArabicLevel(Number(e.target.value))
                                }
                                className='w-full border rounded-md px-3 py-2 mb-2'
                              />
                              <div className='mt-4'>
                                <button
                                  onClick={handleSaveArabic}
                                  className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditModeArabic(false)}
                                  className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div
                                className='h-4 rounded-md overflow-hidden'
                                style={{ background: progressBarColorA }}>
                                <div
                                  className='h-full bg-red-500'
                                  style={{ width: `${arabicLevel}%` }}>
                                  <div className='h-4 w-4 bg-red-500 rounded-full' />
                                </div>
                              </div>
                              <button onClick={handleEditArabic}>
                                <i className='fa-solid fa-pen-to-square fa-xl ml-60 mt-6'></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className='w-full ml-10 flex flex-col justify-center '
                    style={{ height: '100%' }}>
                    <Cv/>
                    <div className='flex justify-between'>
                      <div className='flex flex-col break-words mr-5 w-full bg-white mb-10 shadow-xl rounded-lg'>
                        <div className='flex flex-col text-center mt-3'>
                          <h2 className='text-2xl font-semibold leading-normal text-blueGray-700 mb-2'>
                            Hard Skills
                          </h2>
                          {editModeHardSkill ? (
                            <div>
                              <label
                                htmlFor='hardskills'
                                className='block mb-1'>
                                HardSkills
                              </label>
                              <input
                                type='text'
                                id='hardskills'
                                name='hardskills'
                                value={skillInput}
                                onChange={handleSkillInputChange}
                                className='w-full border rounded-md px-3 py-2 '
                              />
                              {skillInput ? (
                                <div className='bg-gray-300 text-left mx-1 absolute z-10 rounded-md shadow-lg'>
                                  {suggestedSkills.map((skill, index) => (
                                    <div
                                      key={index}
                                      onClick={() => handleSkillClick(skill)}
                                      className='hover:bg-blue-200 px-4 cursor-pointer'>
                                      {skill}
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                              <div className='mt-4'>
                                <button
                                  onClick={handleSaveHardSkill}
                                  className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditModeHardSkill(false)}
                                  className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <ul>
                                {hardSkillInfo.hardSkills.map(
                                  (skill, index) => (
                                    <li key={index}>{skill}</li>
                                  )
                                )}
                              </ul>
                              <button onClick={handleEditHardSkill}>
                                <i class='fa-solid fa-pen-to-square fa-xl ml-60 mt-6'></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {/*-------------------SoftSkills------------------------- */}
                      <div className='flex flex-col break-words ml-5 w-full bg-white mb-10 shadow-xl rounded-lg'>
                        <div className='flex flex-col items-center justify-center align-middle w-full'>
                          <div className='flex flex-col text-center mt-3'>
                            <Softskills />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*------------------------Experiences---------------------------------*/}
                    <div className='flex flex-col break-words w-full bg-white mb-10 shadow-xl rounded-lg'>
                      <div className='flex flex-row justify-between align-middle'>
                        {/* Any content you want to place in this flex row */}
                      </div>
                      <Experiences />
                    </div>
                    {/*------------------------Education---------------------------------*/}
                    <div className='flex flex-col break-words w-full bg-white mb-10 shadow-xl rounded-lg'>
                      <div className='flex flex-row justify-between align-middle'>
                        {/* Any content you want to place in this flex row */}
                      </div>
                      <Educations />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
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
                        borderRadius={state.width / (100 / state.borderRadius)}
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
      )}
    </>
  )
}
