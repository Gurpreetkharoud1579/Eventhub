import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./RootLayout.css";
import authStore from "../store/authStore"

const RootLayout = () => {

  // const [cookieVal, setCookieVal] = useState();
  // const [userType, setUserType] = useState();
  // useEffect(() => {
  //   // Retrieve the value of the 'Authorization' cookie
  //   const userCookie = Cookies.get('Authorization');
  //   const userType = Cookies.get('userType');
  //   setCookieVal(userCookie)
  //   setUserType(userType)
  // }, []);

  // using zustand 
  const store = authStore();

  return (
    <>
      <div className="relative min-h-screen md:flex " data-dev-hint="container">
        <input type="checkbox" id="menu-open" className="hidden" />

        <label
          htmlFor="menu-open"
          className="absolute right-2 bottom-2 shadow-lg rounded-full p-2 bg-gray-100 text-gray-600 md:hidden"
          data-dev-hint="floating action button"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>

        <header
          className="bg-gray-600 text-gray-100 flex justify-between md:hidden"
          data-dev-hint="mobile menu bar"
        >


          <NavLink
            to="/"
            className="block p-4 text-white font-bold whitespace-nowrap truncate">
            EventHub
          </NavLink>

          <label
            htmlFor="menu-open"
            id="mobile-menu-button"
            className="m-2 p-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md"
          >
            <svg
              id="menu-open-icon"
              className="h-6 w-6 transition duration-200 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              id="menu-close-icon"
              className="h-6 w-6 transition duration-200 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>
        </header>

        <aside
          id="sidebar"
          className="bg-gray-800  text-gray-100 md:w-64 w-3/4 space-y-6 pt-6 px-0 fixed inset-y-0 left-0 transhtmlForm md:fixed md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto"
          data-dev-hint="sidebar; px-0 htmlFor frameless; px-2 htmlFor visually inset the navigation"
        >
          <div
            className="flex flex-col space-y-6"
            data-dev-hint="optional div htmlFor having an extra footer navigation"
          >
            <NavLink
              to="/"
              className="text-white flex items-center space-x-2 px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="text-2xl font-extrabold whitespace-nowrap truncate">
                EventHub
              </span>
            </NavLink>


            <nav data-dev-hint="main navigation" className="">
              <NavLink
                to="/"
                className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                Home
              </NavLink>
              <NavLink
                to="About"
                className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                About
              </NavLink>
              <NavLink
                to="Events"
                className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                Events
              </NavLink>
              {
                store.userType === "admin" ? (
                  <>
                    <NavLink
                      to="admin"
                      className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                      Admin Portal
                    </NavLink>
                    <NavLink
                      to="add-new-admin"
                      className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                      Add Admin
                    </NavLink>
                  </>) : (<>
                  </>)
              }
              {
                store.userType === "user" ?
                  (<>
                    <NavLink
                      to="addEvent"
                      className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                      Add Event
                    </NavLink>
                    <NavLink
                    to="myEvents"
                    className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                    My Events
                  </NavLink>
                  </>) : (<></>)
              }
              {store.loggedIn ? (
                <>
                  <NavLink
                    to="profile"
                    className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white">
                    Profile
                  </NavLink>
                  
                  <NavLink
                    to="logout"
                    className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
                  >
                    Logout
                  </NavLink>


                </>

              ) : (
                <>
                  <NavLink
                    to="Login"
                    className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="Register"
                    className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
                  >
                    Register
                  </NavLink>
                </>
              )
              }

            </nav>
            {/* <div className="absolute w-full bottom-2">
              <hr />
              <nav data-dev-hint="main navigation" className="flex flex-row-reverse px-4 py-2">
                <FontAwesomeIcon icon="fa-solid fa-power-off" className="cursor-pointer" />
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button
                </button>
                <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div> */}
          </div>

        </aside>


        <main id="content" className="flex-1 md:ml-[30%] lg:ml-[20%] p-12">
          <div className="max-w-7xl">
            <div className="sm:px-0">
              <Outlet />
            </div>
          </div>
        </main>
      </div>


      <footer class=" body-font flex-1 md:ml-[30%] lg:ml-[19%] ">
        <div class="container px-5 py-2 mx-auto flex items-center sm:flex-row flex-col text-white bg-gray-900">

          <span class="m-auto  text-white text-sm">&copy; 2023 EventHub. All rights reserved.</span>

        </div>
      </footer>
    </>

  );
};

export default RootLayout;
