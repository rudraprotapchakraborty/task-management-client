import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext/AuthContext";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => {
        console.log("Sign out error", error);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setActiveLink("home")}
          className={`${
            activeLink === "home"
              ? "text-purple-500" // Active link color
              : darkMode
              ? "text-gray-300 hover:text-purple-300"
              : "text-gray-700 hover:text-purple-500"
          } transition-transform duration-200 ease-in-out transform hover:scale-105`}
        >
          Home
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`sticky z-50 backdrop-blur-md shadow-xl rounded-full w-11/12 mx-auto px-2 py-1 md:px-4 md:py-3 transition-all duration-300 ${
        scrolling ? "top-0" : "top-4"
      } ${darkMode ? "bg-gray-900 bg-opacity-90" : "bg-white bg-opacity-90"}`}
    >
      <div className="flex justify-between items-center">
        {/* Left Section - Logo */}
        <NavLink>
          <button
            className={`text-lg md:text-2xl font-bold transition-transform duration-300 transform hover:scale-105 ${
              darkMode
                ? "text-purple-300 hover:text-purple-400"
                : "text-purple-500 hover:text-purple-600"
            }`}
          >
            <div className="flex items-center gap-2">
              <p>
                <span
                  className={`${
                    darkMode ? "text-purple-500" : "text-purple-700"
                  }`}
                >
                  &lt;T
                </span>
                ask Management
                <span
                  className={`${
                    darkMode ? "text-purple-500" : "text-purple-700"
                  }`}
                >
                  /&gt;
                </span>
              </p>
            </div>
          </button>
        </NavLink>

        {/* Centered Menu for Desktop */}
        <div className="hidden lg:flex">
          <ul className="flex font-bold gap-10">{links}</ul>
        </div>

        {/* Right Section - Theme Toggle, Login/Register, User Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className={`hidden sm:block p-1.5 md:p-2 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 ${
              darkMode
                ? "bg-purple-700 hover:bg-purple-600 text-white"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            }`}
          >
            {darkMode ? (
              <FaMoon className="text-sm md:text-xl" />
            ) : (
              <FaSun className="text-sm md:text-xl" />
            )}
          </button>

          {/* User Profile or Login */}
          {user ? (
            <div className="relative group hidden sm:block">
              {user.photoURL ? (
                <img
                  className="w-7 h-7 md:w-10 md:h-10 rounded-full object-cover"
                  src={user.photoURL}
                  alt="Profile"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.style.display = "none"; // Hide broken image
                    e.target.nextSibling.style.display = "flex"; // Show fallback initials
                  }}
                />
              ) : null}

              {/* Fallback Profile Picture */}
              <div
                className="w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-white bg-purple-500"
                style={{ display: user.photoURL ? "none" : "flex" }}
              >
                {user.displayName ? user.displayName[0].toUpperCase() : "U"}
              </div>

              <div
                className={`absolute top-14 left-1/2 transform -translate-x-1/2 hidden group-hover:block px-3 py-1 whitespace-nowrap rounded-lg ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.displayName}
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <NavLink
                to="/login"
                className={`btn btn-ghost transition-all ${
                  darkMode
                    ? "text-white hover:text-purple-300"
                    : "text-gray-700 hover:text-purple-500"
                }`}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={`btn btn-ghost transition-all ${
                  darkMode
                    ? "text-white hover:text-purple-300"
                    : "text-gray-700 hover:text-purple-500"
                }`}
              >
                Register
              </NavLink>
            </div>
          )}

          {/* Logout Button */}
          {user && (
            <button
              onClick={handleSignOut}
              className={`btn btn-ghost hidden sm:block transition-all ${
                darkMode
                  ? "text-white hover:text-purple-300"
                  : "text-gray-700 hover:text-purple-500"
              }`}
            >
              Logout
            </button>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleDarkMode}
            className={`p-1.5 md:p-2 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 ${
              darkMode
                ? "bg-purple-700 hover:bg-purple-600 text-white"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            }`}
          >
            {darkMode ? (
              <FaMoon className="text-sm md:text-xl" />
            ) : (
              <FaSun className="text-sm md:text-xl" />
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          {isMenuOpen && (
            <div>
              <ul
                className={`absolute right-4 top-12 p-4 space-y-4 rounded-lg shadow-xl font-bold z-50 ${
                  darkMode
                    ? "bg-black bg-opacity-90 text-gray-300"
                    : "bg-white text-gray-700"
                }`}
              >
                {links}
                {user && (
                  <div className="flex items-center">
                    <div className="relative group">
                      <img
                        className="w-7 h-7 md:w-10 md:h-10 rounded-full"
                        src={user.photoURL}
                        alt="Profile"
                      />
                      <div
                        className={`absolute top-14 left-1/2 transform -translate-x-1/2 hidden group-hover:block px-3 py-1 whitespace-nowrap rounded-lg ${
                          darkMode
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.displayName}
                      </div>
                    </div>

                    <button
                      onClick={handleSignOut}
                      className={`btn btn-ghost transition-all ${
                        darkMode
                          ? "text-white hover:text-purple-300"
                          : "text-gray-700 hover:text-purple-500"
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
