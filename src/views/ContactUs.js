import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'

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

    console.log(formData)
    try {
      await axios.post('https://esprit-compass-backend.vercel.app/contact-us/submit-form', formData)
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
  var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiaWRvdWRpaSIsImEiOiJjbHUxYTJxaHQwa2Q5MmpuMDR6cm9xNG1yIn0.OkeFtSYxR5ihOYpI5W6hlw'
    const map = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [10.189959, 36.899754],
      zoom: 16.3,
      attributionControl: false,
    })

    map.on('load', () => {
      map.addSource('places', {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            // Your GeoJSON features here
          ],
        },
      })
      // Add a layer showing the places.
      map.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        layout: {
          'icon-image': ['get', 'icon'],
          'icon-allow-overlap': true,
        },
      })

      // Event listeners for popups and cursor change
      map.on('click', 'places', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        const description = e.features[0].properties.description

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map)
      })

      map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = ''
      })
    })
    console.log(formData)
    // Clean up
    return () => map.remove()
  }, []) // Only run this effect once on component mount

  return (
    <>
      <Navbar transparent />
      <main>
        <br />
        <div className='justify-center text-center flex flex-wrap mt-12'>
          <div className='w-full md:w-6/12 px-12 md:px-4'>
            <h2 className='font-semibold text-4xl'>Get in touch ! </h2>
            <p className='text-lg leading-relaxed mt-4  text-blueGray-500'>
              this is different ways to find us
            </p>
          </div>
        </div>

        <div className='flex items-center justify-center flex-wrap-reverse'></div>

        <div className='flex flex-wrap-reverse ml-24'>
          <div className='flex-3 p-0 md:p-20 m-5 md:m-10 max-w-3xl'>
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
                className='py-2 ml-80 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300'>
                Submit
              </button>
            </form>
          </div>

          <div className='flex-1 p-10 md:p-20 max-w-2xl mt-3 relative'>
            <div className='mx-10 my-6 relative'>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className='text-xl absolute left-0 top-0'
                style={{ color: '#DC0B31', cursor: 'pointer' }}
                onClick={handleMapIconClick}
              />
              <span className='block mt-2 ml-8'>
                ESPRIT, Cebalat Ben Ammar, Ariana, Tunisia
              </span>
            </div>
            <div className='mx-10 my-6 relative'>
              <FontAwesomeIcon
                icon={faPhone}
                className='text-xl absolute left-0 top-0'
                style={{ color: '#DC0B31' }}
              />
              <span className='block mt-2 ml-8'>+216 51 730 998</span>
            </div>
            <div className='mx-10 my-6 relative'>
              <FontAwesomeIcon
                icon={faEnvelope}
                className='text-xl absolute left-0 top-0'
                style={{ color: '#DC0B31' }}
              />
              <span className='block mt-2 ml-8'>EspritCompass@gmail.com</span>
            </div>
            <div className='mx-10 my-6 relative'>
              <FontAwesomeIcon
                icon={faGlobe}
                className='text-xl absolute left-0 top-0'
                style={{ color: '#DC0B31' }}
              />
              <span className='block mt-2 ml-8'>www.espritcompass.com</span>
            </div>
            <div>
              <div
                id='map'
                style={{
                  height: '400px', // hauteur ajustée
                  width: '100%', // largeur ajustée
                  position: 'relative',
                  border: '2px solid black',
                  borderRadius: '5px', // ajouter une bordure arrondie pour une meilleure apparence
                  overflow: 'hidden', // s'assurer que le contenu ne dépasse pas la carte
                }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
