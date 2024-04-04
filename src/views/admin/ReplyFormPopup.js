import React, { useState } from 'react'
import axios from 'axios'

function ReplyFormPopup({ contactEmail, onClose }) {
  const [replyMessage, setReplyMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/contact-us/send-reply', {
        email: contactEmail,
        replyMessage,
      })
      alert('Reply sent successfully')
      onClose() // Close the popup after sending reply
    } catch (error) {
      console.error('Error sending reply:', error)
      alert('Error sending reply. Please try again later.')
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50'>
      <div className='bg-white p-4 rounded-lg max-w-md'>
        <h2 className='text-lg font-semibold mb-4'>Reply to Contact</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className='w-full border border-gray-300 rounded-md p-2 mb-4'
            rows='4'
            placeholder='Type your reply message here...'
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            required></textarea>
          <div className='flex justify-end'>
            <button
              type='button'
              className='px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2'
              onClick={onClose}>
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-md'>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReplyFormPopup
