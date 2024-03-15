import React, { useState, useRef, useEffect } from 'react'
import ReactAvatarEditor from 'react-avatar-editor'
import axios from 'axios'
import Navbar from 'components/Navbars/IndexNavbar.js'
import Footer from 'components/Footers/Footer.js'
import { useNavigate } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'

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
  const [name, setName] = useState('Chaima Idoudi')
  const [country, setCountry] = useState('Tunisia')
  // const [jobTitle, setJobTitle] = useState('Software Engineer')
  const [isLoading, setIsLoading] = useState(true)

  const [jobLocation, setJobLocation] = useState('Ariana, Tunisia')
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890')
  const [email, setEmail] = useState('')
  const editorRef = useRef(null)

  const handleNewImage = (e) => {
    setState({ ...state, image: e.target.files[0] })
    setShowEditor(true) // Show the editor when a new image is selected
  }
  const handleReplaceImage = () => {
    // Reset the processed image state and show the file input
    setProcessedImage(null)
    setShowEditor(false)
    document.getElementById('dropzone-file').click()
  }
  const [editModeDescrption, setEditModeDescrption] = useState(false)
  const [editModeContactInfo, setEditModeContactInfo] = useState(false)
  const [editModeLang, setEditModeLang] = useState(false)
  const [editModeHardSkill, setEditModeHardSkill] = useState(false)
  const [editModeSoftSkill, setEditModeSoftSkill] = useState(false)
  const [editModeExperiences, setEditModeExperiences] = useState(false)
  const [editModeEducation, setEditModeEducation] = useState(false)

  const [contactInfo, setContactInfo] = useState({
    fullName: 'Chaima Idoudi',
    email: 'idoudi.chaima@esprit.tn',
    phone: '51730998',
  })
  const [descriptionInfo, setDescriptionInfo] = useState({
    description: 'Full Stack Developer ',
  })

  const [langInfo, setLangInfo] = useState({
    french: 60,
    english: 80,
    arabic: 90,
  })

  const [hardSkillInfo, setHardSkillInfo] = useState({
    hardSkills: ['React', 'Angular', 'SpringBoot'],
  })
  const [softSkillInfo, setSoftSkillInfo] = useState({
    softSkills: ['communication', 'leader', 'pacient'],
  })
  const [experienceInfo, setExperienceInfo] = useState({
    experiences: [
      {
        title: 'Summer Internship',
        company: 'Médis',
        duration: '3 months',
      },
      {
        title: 'End Of Year Internship',
        company: 'Médis',
        duration: '6 months',
      },
    ],
  })
  const [educationeInfo, setEducationInfo] = useState({
    educations: [
      {
        title: 'Licence Informatique de Gestion',
        school: 'Essect',
      },
      {
        title: 'Ingenieurie en Informatique',
        company: 'Esprit',
      },
    ],
  })

  //const handleEdit = () => {
  //setEditMode(true)
  //}
  const handleEditDescription = () => {
    setEditModeDescrption(true)
  }
  const handleEditContactInfo = () => {
    setEditModeContactInfo(true)
  }
  const handleEditLang = () => {
    setEditModeLang(true)
  }
  const handleEditHardSkill = () => {
    setEditModeHardSkill(true)
  }
  const handleEditSoftSkill = () => {
    setEditModeSoftSkill(true)
  }
  const handleEditExperiences = () => {
    setEditModeExperiences(true)
  }
  const handleEditEducation = () => {
    setEditModeEducation(true)
  }

  const handleSaveDescription = () => {
    // Save the updated contact information
    setEditModeDescrption(false)
  }
  const handleSaveContactInfo = () => {
    // Save the updated contact information
    setEditModeContactInfo(false)
  }
  const handleSaveLang = () => {
    // Save the updated contact information
    setEditModeLang(false)
  }
  const handleSaveHardSkill = () => {
    // Save the updated contact information
    setEditModeHardSkill(false)
  }
  const handleSaveSoftSkill = () => {
    // Save the updated contact information
    setEditModeSoftSkill(false)
  }
  const handleSaveExperiences = () => {
    // Save the updated contact information
    setEditModeExperiences(false)
  }
  const handleSaveEducation = () => {
    // Save the updated contact information
    setEditModeEducation(false)
  }

  const handleChangeDescription = (e) => {
    const { name, value } = e.target
    setDescriptionInfo({ ...descriptionInfo, [name]: value })
  }
  const handleChangeContactInfo = (e) => {
    const { name, value } = e.target
    setContactInfo({ ...langInfo, [name]: value })
  }
  const handleChangelang = (e) => {
    const { name, value } = e.target
    setLangInfo({ ...contactInfo, [name]: value })
  }
  const handleChangeHardSkill = (e) => {
    const { name, value } = e.target
    setEditModeHardSkill({ ...hardSkillInfo, [name]: value })
  }
  const handleChangeSoftSkill = (e) => {
    const { name, value } = e.target
    setEditModeSoftSkill({ ...softSkillInfo, [name]: value })
  }
  const handleChangeExperiences = (e) => {
    const { name, value } = e.target
    setEditModeExperiences({ ...experienceInfo, [name]: value })
  }
  const handleChangeEducation = (e) => {
    const { name, value } = e.target
    setEditModeEducation({ ...experienceInfo, [name]: value })
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
      setShowEditor(false) // Set the processed image state
    }
  }
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
        console.log(response.data)
        setName(response.data.user.username)
        setEmail(response.data.user.email)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [token])

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
            className='profile-pagerelative w-full h-full py-10 '
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
                        <div className='border p-4 rounded-md shadow-md'>
                          <h2 className='text-lg font-semibold mb-4'>
                            Description
                          </h2>
                          {editModeDescrption ? (
                            <div>
                              <label
                                htmlFor='description'
                                className='block mb-1'>
                                fullName
                              </label>
                              <input
                                type='text'
                                id='description'
                                name='description'
                                value={descriptionInfo.description}
                                onChange={handleChangeDescription}
                                className='w-full border rounded-md px-3 py-2 mb-2'
                              />
                              <div className='mt-4'>
                                <button
                                  onClick={handleSaveDescription}
                                  className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditModeDescrption(false)}
                                  className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p> {descriptionInfo.description}</p>
                              <button onClick={handleEditDescription}>
                                <i class='fa-solid fa-pen-to-square fa-xl ml-60 mt-6'></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {/*------------------Contact Info------------------------- */}
                      <div className=' mt-2'>
                        <div className='border p-4 rounded-md shadow-md'>
                          <h2 className='text-lg font-semibold mb-4'>
                            Contact Information
                          </h2>
                          {editModeContactInfo ? (
                            <div>
                              <label htmlFor='firstName' className='block mb-1'>
                                fullName
                              </label>
                              <input
                                type='text'
                                id='fullName'
                                name='fullName'
                                value={contactInfo.firstName}
                                onChange={handleChangeContactInfo}
                                className='w-full border rounded-md px-3 py-2 mb-2'
                              />

                              <label htmlFor='email' className='block mb-1'>
                                Email
                              </label>
                              <input
                                type='email'
                                id='email'
                                name='email'
                                value={contactInfo.email}
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
                                {' '}
                                <i class='fa-regular fa-user'></i>
                                {contactInfo.fullName}
                              </p>
                              <p>
                                {' '}
                                <i class='fa-regular fa-envelope '></i>
                                {contactInfo.email}
                              </p>
                              <p>
                                {' '}
                                <i class='fa-solid fa-phone'></i>
                                {contactInfo.phone}
                              </p>
                              <button onClick={handleEditContactInfo}>
                                <i class='fa-solid fa-pen-to-square fa-xl ml-60 mt-6'></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {/*------------------------------Languages-----------------------------------*/}
                      <div className=' mt-2'>
                        <div className='border p-4 rounded-md shadow-md'>
                          <h2 className='text-lg font-semibold mb-4'>
                            Languages Lavel
                          </h2>
                          {editModeLang ? (
                            <div>
                              <label htmlFor='french' className='block mb-1'>
                                <strong>French</strong>
                              </label>
                              <input
                                type='number'
                                id='french'
                                name='french'
                                value={langInfo.french}
                                onChange={handleChangelang}
                                className='w-full border rounded-md px-3 py-2 mb-2'
                              />

                              <label htmlFor='english' className='block mb-1'>
                                <strong>English</strong>
                              </label>
                              <input
                                type='number'
                                id='english'
                                name='english'
                                value={langInfo.english}
                                onChange={handleChangelang}
                                className='w-full border rounded-md px-3 py-2 mb-2'
                              />

                              <div className='mt-4'>
                                <button
                                  onClick={handleSaveLang}
                                  className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditModeLang(false)}
                                  className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className='language-container'>
                                <p className='flex items-center'>
                                  <strong>French</strong>
                                </p>
                                <div className='progress-bar-container bg-gray-200 h-2 rounded-lg overflow-hidden'>
                                  <div
                                    className='progress-bar bg-red-600 h-full'
                                    style={{
                                      width: `${langInfo.french}%`,
                                    }}></div>
                                </div>
                              </div>
                              <div className='language-container'>
                                <p className='flex items-center mt-3'>
                                  <strong>English</strong>
                                </p>
                                <div className='progress-bar-container bg-gray-200 h-2 rounded-lg overflow-hidden'>
                                  <div
                                    className='progress-bar bg-red-600 h-full'
                                    style={{
                                      width: `${langInfo.english}%`,
                                    }}></div>
                                </div>
                              </div>
                              <div className='language-container'>
                                <p className='flex items-center mt-3'>
                                  <strong>Arabic</strong>
                                </p>
                                <div className='progress-bar-container bg-gray-200 h-2 rounded-lg overflow-hidden'>
                                  <div
                                    className='progress-bar bg-red-600 h-full'
                                    style={{
                                      width: `${langInfo.arabic}%`,
                                    }}></div>
                                </div>
                              </div>
                              <button onClick={handleEditLang}>
                                <i class='fa-solid fa-pen-to-square fa-xl ml-60 mt-6'></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*-------------------------------HardSkills------------------------------ */}
                  <div
                    className='w-full ml-10  flex flex-col justify-between '
                    style={{ height: '100%' }}>
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
                                value={hardSkillInfo.hardSkills}
                                onChange={handleChangeHardSkill}
                                className='w-full border rounded-md px-3 py-2 mb-2'
                              />
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
                            <h2 className='text-2xl font-semibold leading-normal text-blueGray-700 mb-2'>
                              Soft Skills
                            </h2>
                            {editModeSoftSkill ? (
                              <div>
                                <label
                                  htmlFor='hardskills'
                                  className='block mb-1'>
                                  SoftSkills
                                </label>
                                <input
                                  type='text'
                                  id='softskills'
                                  name='softskills'
                                  value={softSkillInfo.softSkills}
                                  onChange={handleChangeHardSkill}
                                  className='w-full border rounded-md px-3 py-2 mb-2'
                                />
                                <div className='mt-4'>
                                  <button
                                    onClick={handleSaveSoftSkill}
                                    className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditModeSoftSkill(false)}
                                    className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <ul>
                                  {softSkillInfo.softSkills.map(
                                    (skill, index) => (
                                      <li key={index}>{skill}</li>
                                    )
                                  )}
                                </ul>
                                <button onClick={handleEditSoftSkill}>
                                  <i class='fa-solid fa-pen-to-square fa-xl ml-60 mt-6 mb-6'></i>
                                </button>
                              </div>
                            )}
                            {/* Add more soft skills here */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*---------------Reeeest of section ---------------------------find it on github*/}
                    <div className='flex flex-col break-words w-full bg-white mb-10 shadow-xl rounded-lg'>
                      <div className='flex flex-row justify-between align-middle'>
                        {/* Any content you want to place in this flex row */}
                      </div>
                      <div className='flex flex-col items-center justify-center w-full mb-10'>
                        <h2 className='text-2xl font-semibold leading-normal mt-4 mb-2 text-blueGray-700 mb-2'>
                          Experiences
                        </h2>
                        <div className='mx-auto'>
                          <div className='mb-2 text-blueGray-600'>
                            {editModeExperiences ? (
                              <div>
                                {experienceInfo.experiences.map(
                                  (experience, index) => (
                                    <div key={index} className='mb-4'>
                                      <label
                                        htmlFor={`title-${index}`}
                                        className='block mb-1'>
                                        Title
                                      </label>
                                      <input
                                        type='text'
                                        id={`title-${index}`}
                                        name={index}
                                        value={experience.title}
                                        onChange={handleChangeExperiences}
                                        className='w-full border rounded-md px-3 py-2 mb-2'
                                      />
                                      <label
                                        htmlFor={`company-${index}`}
                                        className='block mb-1'>
                                        Company
                                      </label>
                                      <input
                                        type='text'
                                        id={`company-${index}`}
                                        name={index}
                                        value={experience.company}
                                        onChange={handleChangeExperiences}
                                        className='w-full border rounded-md px-3 py-2 mb-2'
                                      />
                                      <label
                                        htmlFor={`duration-${index}`}
                                        className='block mb-1'>
                                        Duration
                                      </label>
                                      <input
                                        type='text'
                                        id={`duration-${index}`}
                                        name={index}
                                        value={experience.duration}
                                        onChange={handleChangeExperiences}
                                        className='w-full border rounded-md px-3 py-2 mb-2'
                                      />
                                    </div>
                                  )
                                )}
                                <div className='mt-4'>
                                  <button
                                    onClick={handleSaveExperiences}
                                    className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                                    Save
                                  </button>
                                  <button
                                    onClick={() =>
                                      setEditModeExperiences(false)
                                    }
                                    className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className='mt-6 ml-6'>
                                <ul>
                                  {experienceInfo.experiences.map(
                                    (experience, index) => (
                                      <li key={index} className='mb-4'>
                                        <div>
                                          <i
                                            class='fa-light fa-briefcase fa-xl'
                                            style={{ color: '#8c0333' }}></i>
                                          <strong>Title:</strong>{' '}
                                          {experience.title}
                                        </div>
                                        <div>
                                          <strong>Company:</strong>{' '}
                                          {experience.company}
                                        </div>
                                        <div>
                                          <strong>Duration:</strong>{' '}
                                          {experience.duration}
                                        </div>
                                      </li>
                                    )
                                  )}
                                </ul>
                                <button
                                  onClick={handleEditExperiences}
                                  className='mt-6'>
                                  <i className='fa-solid fa-pen-to-square fa-xl ml-48'></i>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Add more experiences here */}
                      </div>
                    </div>
                    <div className='flex flex-col break-words w-full bg-white shadow-xl rounded-lg '>
                      <div className='flex flex-row justify-between align-middle'>
                        <div className='flex flex-col items-center justify-center align-middle w-full mb-10'>
                          <h2 className='text-2xl font-semibold leading-normal mt-4 mb-2 text-blueGray-700 mb-2'>
                            Education
                          </h2>
                          <div className='mx-auto'>
                            <div className='mb-2 text-blueGray-600'>
                              {editModeEducation ? (
                                <div>
                                  {educationeInfo.educations.map(
                                    (education, index) => (
                                      <div key={index} className='mb-4'>
                                        <label
                                          htmlFor={`title-${index}`}
                                          className='block mb-1'>
                                          Title
                                        </label>
                                        <input
                                          type='text'
                                          id={`title-${index}`}
                                          name={index}
                                          value={education.title}
                                          onChange={handleChangeEducation}
                                          className='w-full border rounded-md px-3 py-2 mb-2'
                                        />
                                        <label
                                          htmlFor={`school-${index}`}
                                          className='block mb-1'>
                                          School
                                        </label>
                                      </div>
                                    )
                                  )}
                                  <div className='mt-4'>
                                    <button
                                      onClick={handleSaveEducation}
                                      className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                                      Save
                                    </button>
                                    <button
                                      onClick={() =>
                                        setEditModeEducation(false)
                                      }
                                      className='bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded-md'>
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className='mt-6 ml-6'>
                                  <ul>
                                    {educationeInfo.educations.map(
                                      (education, index) => (
                                        <li key={index} className='mb-4'>
                                          <div>
                                            <i
                                              class='fa-light fa-briefcase fa-xl'
                                              style={{ color: '#8c0333' }}></i>
                                            <strong>Title:</strong>{' '}
                                            {education.title}
                                          </div>
                                          <div>
                                            <strong>Company:</strong>{' '}
                                            {education.school}
                                          </div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                  <button
                                    onClick={handleEditEducation}
                                    className='mt-6'>
                                    <i className='fa-solid fa-pen-to-square fa-xl ml-48'></i>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Add more education here */}
                        </div>
                      </div>
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