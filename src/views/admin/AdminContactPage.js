import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Navbar from 'components/Navbars/AdminNavbar'
import Footer from 'components/Footers/FooterAdmin'
import TableDropdown from 'components/Dropdowns/TableDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faTrash,
  faReply,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'

export default function AdminContactPage({ color }) {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/contact-us/get-contacts'
        )
        setContacts(response.data)
      } catch (error) {
        console.error('Error fetching contacts:', error)
      }
    }

    fetchContacts()
  }, [])

  return (
    <>
      <Navbar transparent />
      <br />
      <main>
        <div className='block w-full overflow-x-auto mt-16'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }>
                  Sujet
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }>
                  Name
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }>
                  Email
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                    (color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }>
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center'>
                    {contact.subject}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                    {contact.name}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                    {contact.email}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                    {contact.message}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right'>
                    <TableDropdown />
                  </td>
                  <td>
                    {/* Buttons for marking as read, responding, and deleting */}
                    <button>
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ color: 'green' }}
                      />
                    </button>
                    <button>
                      <FontAwesomeIcon
                        icon={faReply}
                        style={{ color: 'blue' }}
                      />
                    </button>
                    <button>
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: 'red' }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
