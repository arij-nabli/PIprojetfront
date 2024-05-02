import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Navbar from 'components/Navbars/AdminNavbar'
import Footer from 'components/Footers/FooterAdmin'
import TableDropdown from 'components/Dropdowns/TableDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSpinner,
  faTrashAlt,
  faReply,
  faCheck,
  faEye,
} from '@fortawesome/free-solid-svg-icons'

import Sidebar from 'components/Sidebar/Sidebar'
import ReplyFormPopup from './ReplyFormPopup'

export default function AdminContactPage({ color }) {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [replyingTo, setReplyingTo] = useState(null)
  const messageContainerRef = useRef(null)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/contact-us/get-contacts'
        )
        setContacts(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching contacts:', error)
        setError('Error fetching contacts. Please try again later.')
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  useEffect(() => {
    // Scroll to the bottom of the message container when a message is displayed
    if (selectedMessage && messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight
    }
  }, [selectedMessage])

  const handleShowMessage = (message) => {
    setSelectedMessage(message)
  }

  const handleCloseMessage = () => {
    setSelectedMessage(null)
  }

  const handleReply = (email) => {
    setReplyingTo(email)
  }

  const handleSendReply = async (replyMessage) => {
    try {
      await axios.post('http://localhost:5000/contact-us/send-reply', {
        email: replyingTo,
        message: replyMessage,
      })
      alert('Reply sent successfully')
      setReplyingTo(null)
    } catch (error) {
      console.error('Error sending reply:', error)
      alert('Error sending reply. Please try again later.')
    }
  }

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(
        `http://localhost:5000/contact-us/delete-contact/${contactId}`
      )
      setContacts(contacts.filter((contact) => contact._id !== contactId))
    } catch (error) {
      console.error('Error deleting contact:', error)
      alert('Error deleting contact. Please try again later.')
    }
  }

  const renderMessagePreview = (message) => {
    const maxLength = 50 // Max length for message preview
    return message.length > maxLength
      ? `${message.substring(0, maxLength)}...`
      : message
  }

  if (loading) {
    return (
      <div className='text-center py-8'>
        <FontAwesomeIcon
          icon={faSpinner}
          className='animate-spin text-blue-500 text-2xl'
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center py-8'>
        <p className='text-red-500'>{error}</p>
      </div>
    )
  }

  return (
    <>
      <Navbar transparent />
      <Sidebar />
      <br />
      <main>
        <div className='block overflow-x-auto '>
          {contacts.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-gray-500'>No contacts found.</p>
            </div>
          ) : (
            <>
              <table className='items-center ml-60 bg-transparent border-collapse'>
                <thead>
                  <tr>
                    <th className='px-6 py-3 text-xs uppercase font-semibold text-left bg-red-600 border-b border-gray-300 text-white'>
                      Name
                    </th>
                    <th className='px-6 py-3 text-xs uppercase font-semibold text-left bg-red-600 border-b border-gray-300 text-white'>
                      Email
                    </th>
                    <th className='px-6 py-3 text-xs uppercase font-semibold text-left bg-red-600 border-b border-gray-300 text-white'>
                      Subject
                    </th>
                    <th className='px-6 py-3 text-xs uppercase font-semibold text-left bg-red-600 border-b border-gray-300 text-white'>
                      Message
                    </th>
                    <th className='px-6 py-3 text-xs uppercase font-semibold text-left bg-red-600 border-b border-gray-300 text-white'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr
                      key={contact._id}
                      className='transition-all hover:bg-gray-100'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {contact.name}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {contact.email}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {contact.subject}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {renderMessagePreview(contact.message)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <button
                          className='p-2'
                          onClick={() => handleShowMessage(contact.message)}>
                          <FontAwesomeIcon
                            icon={faEye}
                            className='text-purple-500 hover:text-purple-600 transition-all'
                          />
                        </button>
                        <button
                          className='mr-2 p-2'
                          onClick={() => handleReply(contact.email)}>
                          <FontAwesomeIcon
                            icon={faReply}
                            className='text-blue-500 hover:text-blue-600 transition-all'
                          />
                        </button>
                        <button
                          className='p-2'
                          onClick={() => handleDeleteContact(contact._id)}>
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className='text-red-500 hover:text-red-600 transition-all'
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedMessage && (
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50'>
                  <div className='bg-white p-4 rounded-lg max-w-md'>
                    <div
                      className='max-h-96 overflow-y-auto'
                      ref={messageContainerRef}>
                      <p className='whitespace-pre-line'>{selectedMessage}</p>
                    </div>
                    <button
                      className='mt-4 px-4 py-2 bg-red-500 text-white rounded-md'
                      onClick={handleCloseMessage}>
                      Close
                    </button>
                  </div>
                </div>
              )}
              {replyingTo && (
                <ReplyFormPopup
                  contactEmail={replyingTo}
                  onClose={() => setReplyingTo(null)}
                  onSendReply={handleSendReply}
                />
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

AdminContactPage.defaultProps = {
  color: 'light',
}

AdminContactPage.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
}
