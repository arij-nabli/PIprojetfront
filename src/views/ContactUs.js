import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../assets/styles/contact.css'

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
  return (
    <>
      <Navbar transparent />
      <main>
        <br></br>
        <div className='justify-center text-center flex flex-wrap mt-24'>
          <div className='w-full md:w-6/12 px-12 md:px-4'>
            <h2 className='font-semibold text-4xl'>Get in touch ! </h2>
            <p className='text-lg leading-relaxed mt-4 mb-4 text-blueGray-500'>
              this is different ways to find us
            </p>
          </div>
        </div>
        <br></br>
        <div className='contact-info-container'>
          <div className='contact-info-item'>
            <FontAwesomeIcon icon={faMapMarkerAlt} className='icon red' />
            <br />
            Pôle Technologique - El Ghazala
          </div>
          <div className='contact-info-item'>
            <FontAwesomeIcon icon={faPhone} className='icon yellow' />
            <br />
            +216 51 730 998
          </div>
          <div className='contact-info-item'>
            <FontAwesomeIcon icon={faEnvelope} className='icon red' />
            <br />
            EspritCompass@gmail.com
          </div>
          <div className='contact-info-item'>
            <FontAwesomeIcon icon={faGlobe} className='icon yellow' />
            <br />
            www.espritcompass.com
          </div>
        </div>
        <div className='container'>
          <div className='form-container'>
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
                className='py-2 px-3 mb-4 border border-gray-300 rounded-md'
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
                className='py-2 px-3 mb-4 border border-gray-300 rounded-md'
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
                className='py-2 px-3 mb-4 border border-gray-300 rounded-md'
              />

              <label htmlFor='message' className='mb-2'>
                Message:
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                className='py-2 px-3 mb-4 border border-gray-300 rounded-md'></textarea>

              <button
                type='submit'
                className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                Submit
              </button>
            </form>
          </div>
          <div className='image-container'>
            <img
              src='https://scontent.ftun2-2.fna.fbcdn.net/v/t1.15752-9/423472538_1121470842377439_6870367757892080989_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=RXeeHQOXvmkAX9r5Rt7&_nc_ht=scontent.ftun2-2.fna&oh=03_AdS9BRK-wVzpst1X00MpuiLmgUlcm_uqnWfYqarkh93s0g&oe=6609D232'
              alt='Contact'
              className='max-w-full h-auto'
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
