import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";
import { useNavigate } from "react-router-dom";
import PagesDropdown from "components/Dropdowns/PagesDropdown.js";
import NotificationDropdown from "components/Dropdowns/NotificationDropdown";

/*eslint-disable*/
// components

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [displayNotification, setDisplayNotification] = React.useState(false);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate("/auth/login");
  }
  return (
    <div>
      <nav style={{ height: "10%" }} className="shadow flex flex-wrap items-center justify-between px-2 navbar-expand-lg bg-white">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-0 whitespace-nowrap uppercase"
              to="/"
            >
              <img src={logo} alt="logo" width={120} />
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <NotificationDropdown userId={props.id}/>
              

              <li className="flex items-center">
                <Link
                  to={"/offer"}
                  className="text-gray-700  hover:text-sm rounded hover:bg-custom-pink hover:text-black  transition duration-200 ease-in-out px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  offers
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to={"/profile"}
                  className="text-gray-700  hover:text-sm rounded hover:bg-custom-pink hover:text-black  transition duration-200 ease-in-out px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  profile
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to={`/applications/${props.id}`}
                  className="text-gray-700  hover:text-sm rounded hover:bg-custom-pink hover:text-black  transition duration-200 ease-in-out px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  applications
                </Link>
              </li>
             
             

              <li className="flex items-center ">
                <PagesDropdown />
              </li>
              <li className="flex items-center">
                <a
                  onClick={() => logout()}
                  className="text-gray-700  hover:text-sm rounded hover:bg-custom-pink hover:text-black  transition duration-200 ease-in-out px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
