/*eslint-disable*/
import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo-bg-tr.png'

import io from "socket.io-client";


export default function Sidebar(props) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const [notificationNumber, setNotificationNumber] = React.useState(0);
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  }

  useEffect(() => {
    console.log(props.pendingCompaniesNbr)
    setNotificationNumber(props.pendingCompaniesNbr)
    const socket = io('https://esprit-compass-backend.vercel.app');
    socket.on('connect', () => {
      console.log('connected to socket server');
    });
    socket.on('newCompany', (message) => {
      console.log('new message', message);
      console.log("nbr",notificationNumber)
      setNotificationNumber(prevNumber => prevNumber + 1);
    }
  )
},[props.pendingCompaniesNbr])
  return (
    <>
      <nav className='md:left-0 my-8 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden  bg-gray-100 flex flex-wrap items-center mr-10 justify-between relative md:w-64 z-10 py-4 px-6'>
        <div className='md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto'>
          {/* Toggler */}
          <button
            className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
            type='button'
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}>
            <i className='fas fa-bars'></i>
          </button>
          {/* Brand */}
          <Link
            className='md:block text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0'
            to='/admin'>
            <div className='flex items-center'>
              {' '}
              <img src={logo} alt='compass' border='0' width='50' height='50' />
              ESPRIT COMPASS
            </div>
          </Link>
          {/* User */}

          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }>
            {/* Collapse header */}
            <div className='md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid  border-blueGray-200'>
              <div className='flex flex-wrap'>
                <div className='w-6/12'>
                  <Link
                    className='md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0'
                    to='/admin'>
                    <img
                      src={logo}
                      alt='compass'
                      border='0'
                      width='50'
                      height='50'
                    />
                    ESPRIT COMPASS
                  </Link>
                </div>
                <div className='w-6/12 flex justify-end'>
                  <button
                    type='button'
                    className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
                    onClick={() => setCollapseShow('hidden')}>
                    <i className='fas fa-times'></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}

            {/* Divider */}
            <hr className='md:min-w-full border-1 border-gray-400 mb-5' />
            <h6 className='md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline'>
              Admin Layout Pages
            </h6>
            {/* Navigation */}

            <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
              <li className='items-center mb-1'>
                <Link
                  className={
                    'text-xs uppercase py-3 font-bold block ' +
                    (location.pathname === '/admin'
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                  to='/admin'>
                  <i
                    className={
                      'fa-solid fa-chart-line mr-2 text-sm ' +
                      (location.pathname === '/admin'
                        ? 'opacity-75'
                        : 'text-blueGray-300')
                    }></i>{' '}
                  Dashboard
                </Link>
              </li>
              <li className='items-center mb-1'>
                <Link
                  className={
                    'text-xs uppercase py-3 font-bold block ' +
                    (window.location.href.indexOf('/admin/all-users') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                  to='/admin/all-users'>
                  <i
                    className={
                      'fas fa-tv mr-2 text-sm ' +
                      (window.location.href.indexOf('/admin/all-users') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-300')
                    }></i>{' '}
                  Users
                </Link>
              </li>

              <li className="flex justify-between items-center mb-1">
                <Link
                  className={
                    'text-xs uppercase py-3 font-bold block ' +
                    (window.location.href.indexOf('/admin/companies') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                  to='/admin/companies'>
                  <i
                    className={
                      'fas fa-building mr-2 text-sm ' +
                      (window.location.href.indexOf('/admin/companies') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-300')
                    }></i>{' '}
                  Companies
                </Link>
    {notificationNumber >0 &&            <div style={{ position: 'relative' }}>
  <i className="fa-solid fa-circle text-xl text-red-500"></i>
  <span style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '0.75rem',
    color: 'white'
  }}>
    {notificationNumber}
  </span>
</div>}              </li>

              <li className='items-center mb-1'>
                <Link
                  className={
                    'text-xs uppercase py-3 font-bold block ' +
                    (window.location.href.indexOf('/admin/skills') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                  to='/admin/skills'>
                  <i
                    className={
                      'fa-solid fa-laptop-code mr-2 text-sm ' +
                      (window.location.href.indexOf('/admin/skills') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-300')
                    }></i>{' '}
                  Skills
                </Link>
              </li>
              <li className='items-center mb-1'>
              <Link
                  className={
                    'text-xs uppercase py-3 font-bold block ' +
                    (window.location.href.indexOf('/AdminContacts') !== -1
                      ? 'text-lightBlue-500 hover:text-lightBlue-600'
                      : 'text-blueGray-700 hover:text-blueGray-500')
                  }
                  to='/AdminContacts'>
                  <i
                    className={
                      'fa-solid fa-envelope mr-2 text-sm ' +
                      (window.location.href.indexOf('/AdminContacts') !== -1
                        ? 'opacity-75'
                        : 'text-blueGray-300')
                    }></i>{' '}
                  Contacts
                </Link>
          
              </li>
              <li className="items-center mb-1">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/industries") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/industries"
                >
                  <i
                    className={
                      "fa-solid fa-industry mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/industries") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Industries
                </Link>
              </li>
              <li className="items-center mb-1">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/offers") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/offers"
                >
                  <i
                    className={
                      "fa-solid fa-briefcase mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/offers") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Offers
                </Link>
              </li>
              <li className="items-center mb-1">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/profile") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/profile"
                >
                  <i
                    className={
                      "fa-solid fa-user mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/profile") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Admin profile
                </Link>
              </li>
              <button
                className="items-center mb-1 bg-red-500 flex justify-center w-full bottom-0 absolute text-xs uppercase py-3 font-bold  text-white"
                onClick={logout}
              >
                <i
                  class="fa-solid fa-arrow-right-from-bracket  mr-2 text-sm  opacity-75 text-blueGray-300"
                  style={{ color: "white" }}
                ></i>{" "}
                Logout
              </button>
            </ul>

            {/* Divider */}
          </div>
        </div>
      </nav>
    </>
  )
}
