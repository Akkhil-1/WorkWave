import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logosaas.png";
import axios from "axios";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
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
        "http://localhost:3001/user/user-profile",
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
    // Clear the token cookie and set logged out state
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setIsLoggedIn(false);
    navigate("/user-landingpage");
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <header
      className={`sticky top-0 z-20 ${
        scroll ? "bg-[#0E0C17]" : "bg-[#0E0C17]"
      } transition-colors text-white`}
    >
      <div className="py-5 flex justify-center items-center bg-white text-black text-sm gap-3 ">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center">
              <img src={Logo} alt="saaslogo" className="h-10 w-10" />
              <h1 className="font-semibold text-[1.5rem] ml-1 mt-1">
                WorkWave
              </h1>
            </div>

            <nav className="hidden md:flex gap-10 text-black/75 items-center font-bold">
              <NavLink to="/user-landingpage">Home</NavLink>
              <NavLink to="/businesses/allbusinesses">Services</NavLink>
              <a href="#customer">Testimonials</a>
              <a href="#help">Help</a>

              {!isLoggedIn ? (
                <NavLink to="/user-login">
                  <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
                    Login
                  </button>
                </NavLink>
              ) : (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="bg-transparent text-black font-medium"
                  >
                    <span>{userName || "Account"}</span>
                  </button>
                  {dropdownVisible && (
                    <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg p-2 w-40">
                      <NavLink to="/user-dashboard" className="block px-4 py-2">
                        Dashboard
                      </NavLink>
                      <NavLink to="/user-update-form" className="block px-4 py-2">
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
