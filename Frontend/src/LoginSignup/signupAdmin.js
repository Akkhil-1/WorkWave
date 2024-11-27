import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSection from "./HeroSectionUser";
import Toast, { ToastContainerWrapper } from "./Helper/ToastNotify";
import toast from "react-hot-toast";
import homeIcon from "./icons8-home-24.png";

const RegisterFormUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
    confirm_password: "",
    gender: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Validate Phone Number
  const validatePhoneNumber = (phone) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  // Updated Email Validation
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Validate Password Length
  const validatePasswordLength = (password) => {
    return password.length >= 6;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};

    if (!formData.name) formErrors.name = "Name is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    else if (!validateEmail(formData.email)) formErrors.email = "Invalid email format.";
    if (!formData.mobile_number) formErrors.mobile_number = "Mobile number is required.";
    else if (!validatePhoneNumber(formData.mobile_number)) formErrors.mobile_number = "Mobile number must be 10 digits.";
    if (!formData.password) formErrors.password = "Password is required.";
    else if (!validatePasswordLength(formData.password)) formErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirm_password) formErrors.confirm_password = "Passwords do not match.";
    if (!formData.gender) formErrors.gender = "Gender is required.";
    if (!formData.address) formErrors.address = "Address is required.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const respo = await axios.post(
        "http://localhost:3001/user/signup",
        formData,
        { withCredentials: true, credentials: "include" }
      );
      toast.success("Registered Successfully");
      setTimeout(() => {
        navigate("/user-login");
      }, 1000);
    } catch (e) {
      toast.error("User already exists.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex min-h-screen">
      <HeroSection />
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <NavLink to={"/user-login"} className="text-gray-600 mb-8">
            <div style={{ display: "flex", height: "auto" }}>
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
            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={formData.name}
                className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={formData.email}
                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Mobile Number Field */}
            <div className="mb-4">
              <input
                type="text"
                name="mobile_number"
                id="mobile_number"
                onChange={handleChange}
                value={formData.mobile_number}
                className={`mt-1 block w-full px-3 py-2 border ${errors.mobile_number ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Mobile Number"
              />
              {errors.mobile_number && <p className="text-red-500 text-sm">{errors.mobile_number}</p>}
            </div>

            {/* Password Field with Show Icon */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Password"
              />
              <div
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <span className="text-gray-500">👁️</span>
                ) : (
                  <span className="text-gray-500">👁️‍🗨️</span>
                )}
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Confirm Password Field with Show Icon */}
            <div className="mb-4 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                id="confirm_password"
                onChange={handleChange}
                value={formData.confirm_password}
                className={`mt-1 block w-full px-3 py-2 border ${errors.confirm_password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Confirm Password"
              />
              <div
                onClick={toggleShowConfirmPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <span className="text-gray-500">👁️</span>
                ) : (
                  <span className="text-gray-500">👁️‍🗨️</span>
                )}
              </div>
              {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}
            </div>

            {/* Gender Field */}
            <div className="mb-4">
              <select
                name="gender"
                id="gender"
                onChange={handleChange}
                value={formData.gender}
                className={`mt-1 block w-full px-3 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            {/* Address Field */}
            <div className="mb-4">
              <textarea
                name="address"
                id="address"
                onChange={handleChange}
                value={formData.address}
                rows="4"
                className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="Address"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-md shadow-md focus:outline-none hover:bg-indigo-600"
            >
              Register
            </button>
          </form>

          <ToastContainerWrapper />
        </div>
      </div>
    </div>
  );
};

export default RegisterFormUser;
