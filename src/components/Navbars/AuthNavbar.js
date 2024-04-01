/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.jpg";

// components
import PagesDropdown from "components/Dropdowns/PagesDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <div>
      <nav
        style={{ height: "10%" }}
        className="shadow-2xl flex flex-wrap items-center justify-between px-2 navbar-expand-lg bg-white"
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-0 whitespace-nowrap uppercase"
            >
              <img src={logo} alt="logo" className="mt-2" width={120} />
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
              <li className="flex items-center">
                <Link
                  to={"/auth/login"}
                  className="text-gray-700  hover:text-sm rounded hover:bg-custom-pink hover:text-black  transition duration-200 ease-in-out px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  Sign In
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to={"/auth/register/user"}
                  className="text-gray-700 hover:text-sm rounded hover:bg-custom-pink hover:text-black  transition duration-200 ease-in-out px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  Sign Up
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  to={"/auth/register/company"}
                  className="text-gray-700 hover:text-sm rounded hover:bg-custom-pink hover:text-black  transition duration-200 ease-in-out px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  Join as company
                </Link>
              </li>
              <li className="flex items-center">
                <PagesDropdown />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
