import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSection from "./HeroSection";
import Toast, { ToastContainerWrapper } from "./Helper/ToastNotify"; // Import Toast and ToastContainerWrapper
import toast from "react-hot-toast";
import homeIcon from "./icons8-home-24.png";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
    confirm_password: "",
    gender: "",
    address: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      toast.error("Passwords do not match");
      return;
    }
    console.log(formData);
    try {
      const respo = await axios.post(
        "http://localhost:3001/admin/signup",
        formData,
        { withCredentials: true, credentials: "include" }
      );
      console.log(respo);
      toast.success("Registered Successfully");
      setTimeout(() => {
        navigate("/loginAdmin");
      }, 1000);
    } catch (e) {
      toast.error("Please Enter the Correct details!");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
    if (name === "password" || name === "confirm_password") {
      setPasswordMatch(
        name === "password"
          ? value === formData.confirm_password
          : value === formData.password
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <HeroSection />
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <NavLink to={"/loginAdmin"} className="text-gray-600 mb-8">
            <div
              style={{
                display: "flex",
                // alignItems: "left",
                // justifyContent: "center",
                height: "auto",
              }}
            >
              <img
                src={homeIcon}
                alt="Home Icon"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </NavLink>
          <h2 className="text-3xl font-semibold mb-4">Get Started with Us!</h2>
          <p className="text-gray-600 mb-8">
            New to our platform? Register today to connect with local clients.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={formData.name}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Name"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={formData.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="mobile_number"
                id="mobile_number"
                onChange={handleChange}
                value={formData.mobile_number}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Mobile Number"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Password"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                onChange={handleChange}
                value={formData.confirm_password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Confirm Password"
              />
            </div>
            {/* {!passwordMatch && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )} */}
            <div className="mb-4">
              <input
                type="text"
                name="gender"
                id="gender"
                onChange={handleChange}
                value={formData.gender}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Gender"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="address"
                id="address"
                onChange={handleChange}
                value={formData.address}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Address"
              />
            </div>
            <button
              type="submit"
              className="w-full  bg-indigo-600  text-white  py-2 rounded-md"
            >
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?
            <NavLink
              to="/loginAdmin"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
      <ToastContainerWrapper />
    </div>
  );
};
export default RegisterForm;
