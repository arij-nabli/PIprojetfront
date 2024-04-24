import AudioRecorder from 'views/profile/AudioRecorder'
import VideoRecorder from 'views/profile/VideoRecorder'
import Navbar from 'components/Navbars/IndexNavbar.js'

import React, { useState } from 'react'

export default function Record() {
  const [recordOption, setRecordOption] = useState('video')

  const toggleRecordOption = (type) => {
    return () => {
      setRecordOption(type)
    }
  }

  return (
    <div className='p-4'>
      <Navbar />
      <div className='mt-8 text-center'>
        <p className='text-3xl font-bold text-gray-800 mb-8 mt-12'>
          5 Steps to Make a Stellar Video Resume:
        </p>
        <ul className='  '>
          <li className='mb-8 '>
            <span className='font-medium text-blue-600'>
              Test your equipment:
            </span>{' '}
            Ensure your recording equipment, such as camera and microphone, is
            working flawlessly before you hit record.
          </li>
          <li className='mb-8'>
            <span className='font-medium text-green-600'>
              Craft a captivating script:
            </span>{' '}
            Prepare a well-structured script that showcases your unique skills,
            experiences, and achievements.
          </li>
          <li className='mb-8'>
            <span className='font-medium text-pink-600'>Dress to impress:</span>{' '}
            Choose a professional outfit that reflects your personal style and
            aligns with your target industry.
          </li>
          <li className='mb-8'>
            <span className='font-medium text-yellow-600'>
              Bring your story to life:
            </span>{' '}
            Avoid reciting your resume; instead, captivate your viewers with
            engaging storytelling that conveys your passion and personality.
          </li>
          <li>
            <span className='font-medium text-purple-600'>
              Perfect your masterpiece:
            </span>{' '}
            Once you've recorded your video, take the time to review and refine
            it, ensuring it's polished and error-free.
          </li>
        </ul>
      </div>

      <p className='text-3xl font-bold text-center text-gray-800 mb-4 mt-4'>
        are you ready ?
      </p>

      <div className='flex justify-center space-x-4 mb-4'>
        <button
          className={`px-4 py-2 rounded ${
            recordOption === 'video'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-blue-500 hover:bg-blue-500 hover:text-white'
          }`}
          onClick={toggleRecordOption('video')}>
            <i class="fa-solid fa-video fa-xl mr-3"></i>
          Record Video
          
        </button>
        <button
          className={`px-4 py-2 rounded ${
            recordOption === 'audio'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-blue-500 hover:bg-blue-500 hover:text-white'
          }`}
          onClick={toggleRecordOption('audio')}>
            <i class="fa-solid fa-microphone fa-xl mr-3"></i>
          Record Audio
        </button>
      </div>
      <div>
        {recordOption === 'video' ? <VideoRecorder /> : <AudioRecorder />}
      </div>
    </div>
  )
}
