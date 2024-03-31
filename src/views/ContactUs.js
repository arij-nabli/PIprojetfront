import React from 'react'
import { useState } from 'react'
import axios from 'axios'

// components
import Navbar from 'components/Navbars/AuthNavbar'
import Footer from 'components/Footers/Footer.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:5000/contact-us/submit-form', formData)
      alert('Formulaire soumis avec succès !')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error)
      alert('Une erreur est survenue lors de la soumission du formulaire.')
    }
  }
  const handleMapIconClick = () => {
    // Adresse à ouvrir dans Google Maps
    const address = encodeURIComponent(
      'ESPRIT, Cebalat Ben Ammar, Ariana, Tunisia'
    )

    // URL pour Google Maps avec l'adresse spécifiée
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`

    // Ouvrir l'URL dans une nouvelle fenêtre
    window.open(mapsUrl, '_blank')
  }
  return (
    <>
      <Navbar transparent />
      <main>
        <br />
        <div className='justify-center text-center flex flex-wrap mt-24'>
          <div className='w-full md:w-6/12 px-12 md:px-4'>
            <h2 className='font-semibold text-4xl'>Get in touch ! </h2>
            <p className='text-lg leading-relaxed mt-4 mb-4 text-blueGray-500'>
              this is different ways to find us
            </p>
          </div>
        </div>
        <br />
        <div className='flex items-center justify-center flex-wrap-reverse'>
          <div className='mx-10 text-center '>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className='text-xl'
              style={{ color: '#88022a', cursor: 'pointer' }}
              onClick={handleMapIconClick}
            />
            <br />
            ESPRIT, Cebalat Ben Ammar, Ariana, Tunisia
          </div>
          <div className='mx-10 text-center'>
            <FontAwesomeIcon
              icon={faPhone}
              className='text-xl'
              style={{ color: '#FFD43B' }}
            />
            <br />
            +216 51 730 998
          </div>
          <div className='mx-10 text-center'>
            <FontAwesomeIcon
              icon={faEnvelope}
              className='text-xl'
              style={{ color: '#84061f' }}
            />
            <br />
            EspritCompass@gmail.com
          </div>
          <div className='mx-10 text-center'>
            <FontAwesomeIcon
              icon={faGlobe}
              className='text-xl'
              style={{ color: '#FFD43B' }}
            />
            <br />
            www.espritcompass.com
          </div>
        </div>

        <div className='flex flex-wrap-reverse ml-24'>
          <div className='flex-3 p-10 md:p-20 m-5 md:m-10 max-w-3xl'>
            <h2 className='text-xl font-bold mb-4'>Contact Us</h2>
            <form className='flex flex-col' onSubmit={handleSubmit}>
              <label htmlFor='name' className='mb-2'>
                Name:
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='py-2 px-3 mb-4 border border-gray-300 rounded-md w-full xl:w-96'
              />

              <label htmlFor='email' className='mb-2'>
                Email:
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='py-2 px-3 mb-4 border border-gray-300 rounded-md w-full xl:w-96'
              />

              <label htmlFor='subject' className='mb-2'>
                Subject:
              </label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                className='py-2 px-3 mb-4 border border-gray-300 rounded-md w-full xl:w-96'
              />

              <label htmlFor='message' className='mb-2'>
                Message:
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                className='py-2 px-3 mb-4 border border-gray-300 rounded-md w-full xl:w-96'></textarea>

              <button
                type='submit'
                className='py-2 px-4 bg-red-800 text-white rounded-md shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300'>
                Submit
              </button>
            </form>
          </div>

          <div className='flex-1 p-10 md:p-20 max-w-2xl mt-3'>
            <img
              src='https://scontent.ftun2-2.fna.fbcdn.net/v/t1.15752-9/423472538_1121470842377439_6870367757892080989_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=RXeeHQOXvmkAX9r5Rt7&_nc_ht=scontent.ftun2-2.fna&oh=03_AdS9BRK-wVzpst1X00MpuiLmgUlcm_uqnWfYqarkh93s0g&oe=6609D232'
              alt='Contact'
              className='w-full h-auto'
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
