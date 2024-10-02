import { useState } from "react";
import { useAuthStore } from "../store/authUser";
import { Link } from "react-router-dom";
import Input from "./Input";



export default function Navbar() {
  const { user, logout } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(false);


  // const [theme, setTheme] = useState(
  //   localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  // );
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // localStorage.setItem('theme', theme);
  };



  
  return (
    <>
      <nav className=" bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to="https://flowbite.com"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {user ? (
              <Link
                to="/"
                className="text-lg  text-gray-500 dark:text-white hover:underline"
              >
                {user.name}
              </Link>
            ) : (
              <Link
                to="/"
                className="text-lg  text-gray-500 dark:text-white hover:underline"
              >
                (555) NO-USER
              </Link>
            )}

            {!user ? (
              <Link
                to="/login"
                className="text-lg  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </Link>
            ) : (
              <Link
                to="#"
                onClick={logout}
                className="text-lg  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Logout
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 text-lg text-white bg-blue-600 dark:bg-blue-800 rounded"
            >
              Toggle Dark Mode
            </button>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-lg">
              <li>
                <Link
                  to="#"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/data"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Data
                </Link>
              </li>

            
           {user&& <Input/>} 

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
