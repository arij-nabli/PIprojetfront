import React from 'react'
import { Link } from 'react-router-dom'

export default function VideoCv() {
  return (
    <>
      <Link
        to='/record'
        className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 ml-3 flex items-center'>
        <i className='fab fa-creative-commons-sampling-plus fa-xl'></i> Record
        Your Audio / Video Resume
      </Link>
    </>
  )
}
