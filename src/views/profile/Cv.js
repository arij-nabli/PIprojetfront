import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Cv(props) {
  const [formData, setFormData] = useState({
    cvFile: null,
    cvFileName: '',
    user: {},
    token: localStorage.getItem('token'),
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await updateUserCV(
        formData.user._id,
        formData.cvFile,
        formData.token
      )
      console.log(response.data)
      // Display a success message if necessary
    } catch (error) {
      console.error(error)
      // Display an error message if necessary
    }
  }

  const updateUserCV = async (userId, cvFile, token) => {
    const formData = new FormData()
    formData.append('cv', cvFile)

    return await axios.post(
      `http://localhost:5000/user/update-cv?id=${userId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }

  const handleViewCV = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/cv/${formData.user._id}`,
        {
          responseType: 'arraybuffer',
        }
      )

      const file = new Blob([response.data], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)

      if (file.type.includes('image')) {
        const image = new Image()
        image.src = fileURL
        const newWindow = window.open('')
        newWindow.document.write(image.outerHTML)
      } else {
        window.open(fileURL)
      }
    } catch (error) {
      console.error(error)
      // Display an error message if necessary
    }
  }

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/getUserById/${props.id}`,
      
      )
      console.log(response.data)
      const userData = response.data
      setFormData({ ...formData, user: userData, cvFileName: userData.cv || '' })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log('IDDDDDDDDD',props.id)
    fetchUserData(formData.token)
  }, [formData.token])
  const [pdfText, setPdfText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
/*
  useEffect(() => {
    const fetchPdfText = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pdf/parse-pdf'); // Update the URL with your Express.js server URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        setPdfText(text);
        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching the PDF text.');
        setLoading(false);
      }
    };

    fetchPdfText();
  }, []);
*/
  return (
    <div className='container mx-auto px-4 h-full flex justify-center items-center m-3'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex items-center'>
            <label className='cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-4 w-full'>
              <input
                type='file'
                onChange={(e) => {
                  setFormData({ ...formData, cvFile: e.target.files[0], cvFileName: e.target.files[0].name })
                }}
                className='hidden'
              />
              <span className='text-lg'>
                {formData.cvFileName ? formData.cvFileName : 'Upload your CV'}
              </span>
            </label>
          {props.isMyProfile &&  <button
              type='submit'
              className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 ml-3'>
              <i className='fa-solid fa-floppy-disk'></i>
            </button>}
            <button
              onClick={handleViewCV}
              className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 ml-3'>
              <i className='fa-solid fa-file-pdf'></i>{' '}
            </button>
          </div>
        </form>
      </div>
    
  )
}
