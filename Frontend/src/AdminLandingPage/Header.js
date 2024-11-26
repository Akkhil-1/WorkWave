import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logosaas.png";
import Button from "./Button";
import axios from "axios";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const fetchInfo = async () => {
    try {
      const token = getCookie("token");
      if (!token) {
        setIsLoggedIn(false); // If no token, set logged out state
        return;
      }

      // Make the API call to fetch user information based on the token
      const response = await axios.get(
        "http://localhost:3001/admin/admin-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // If response data is available, set the user name and logged-in state
      if (response.data && response.data.name) {
        setUserName(response.data.name);
        setIsLoggedIn(true); // Update login state after successful data fetch
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setIsLoggedIn(false); // On error, set logged out state
    }
  };

  useEffect(() => {
    // Check if there's a token on mount
    const token = getCookie("token");

    // If token exists, set login state and fetch user info
    if (token) {
      setIsLoggedIn(true);
      fetchInfo(); // Call fetchInfo to retrieve the user details
    } else {
      setIsLoggedIn(false); // If no token, set logged out state
    }

    // Handle scroll behavior
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handleLogout = () => {
    // Clear the 'token' and 'role' cookies by setting their expiration date to the past
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    setIsLoggedIn(false); // Set logged out state
    navigate("/"); // Redirect to the homepage
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Correctly toggle mobile menu state
    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto"; // Disable scroll when menu is open
  };

  return (
    <header
      className={`sticky top-0 z-20 ${
        scroll ? "bg-[#0E0C17]" : "bg-[#0E0C17]"
      } transition-colors text-white`}
    >
      <div className="py-5 flex justify-center items-center bg-black text-white text-sm gap-3 ">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center">
              <img src={Logo} alt="saaslogo" height={40} width={40} />
              <h1 className="font-bold text-[1.4rem] ml-1">WorkWave</h1>
            </div>

            {/* Hamburger Icon for mobile */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
              <div className="mobile-menu fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col justify-start items-center text-white text-xl z-10">
                <button
                  onClick={toggleMenu}
                  className="absolute top-5 right-5 text-white text-3xl"
                >
                  &times;
                </button>
                <NavLink
                  to="/"
                  onClick={toggleMenu}
                  className="py-4 px-6 w-full text-center mt-[100px] text-[40px]"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/business-add-business"
                  onClick={toggleMenu}
                  className="py-4 px-6 w-full text-center mt-[30px] text-[40px]"
                >
                  Add Business
                </NavLink>
                <NavLink
                  to="/update-form"
                  onClick={toggleMenu}
                  className="py-4 px-6 w-full text-center mt-[30px] text-[40px]"
                >
                  Form
                </NavLink>
                <a
                  href="/help"
                  onClick={toggleMenu}
                  className="py-4 px-6 w-full text-center mt-[30px] text-[40px]"
                >
                  Help
                </a>

                {!isLoggedIn ? (
                  <NavLink to="/admin-login" onClick={toggleMenu}>
                    <Button className="mt-[70px] text-[20px]">Login</Button>
                  </NavLink>
                ) : (
                  <div className="relative py-2 px-4 w-full text-center">
                    <button
                      onClick={toggleDropdown}
                      className="bg-transparent text-white font-medium text-[15px]"
                    >
                      <span>{userName || "Account"}</span>
                    </button>
                    {dropdownVisible && (
                      <div className="absolute top-0 left-0 w-full bg-white text-black p-4 shadow-lg">
                        <NavLink
                          to="/dashboard"
                          className="block py-2 text-center"
                        >
                          Dashboard
                        </NavLink>
                        <NavLink
                          to="/update-form"
                          className="block py-2 text-center"
                        >
                          Update Profile
                        </NavLink>
                        <button
                          onClick={handleLogout}
                          className="block py-2 w-full text-left text-red-500"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Desktop menu */}
            <nav
              className={`md:flex gap-10 text-white/60 items-center ${
                isMenuOpen ? "hidden" : "block"
              } md:block sm:hidden`}
            >
              <NavLink to="/">Home</NavLink>
              <NavLink to="/business-add-business">Add Business</NavLink>
              <NavLink to="/update-form">Form</NavLink>
              <a href="/help">Help</a>

              {!isLoggedIn ? (
                <NavLink to="/admin-login">
                  <Button>Login</Button>
                </NavLink>
              ) : (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="bg-transparent text-white font-medium text-[15px]"
                  >
                    <span>{userName || "Account"}</span>
                  </button>
                  {dropdownVisible && (
                    <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg p-2 w-40">
                      <NavLink to="/dashboard" className="block px-4 py-2">
                        Dashboard
                      </NavLink>
                      <NavLink to="/update-form" className="block px-4 py-2">
                        Update Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-500"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
