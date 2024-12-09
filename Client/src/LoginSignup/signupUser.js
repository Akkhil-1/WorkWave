import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSection from "./HeroSectionUser";
import Toast, { ToastContainerWrapper } from "./Helper/ToastNotify"; // Import Toast and ToastContainerWrapper
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Eye Icons

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

  // Validate name (no numbers or special characters)
  const validateName = (name) => {
    const namePattern = /^[a-zA-Z\s]+$/;
    return namePattern.test(name);
  };

  // Validate email (specific domains allowed)
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z][a-zA-Z0-9._%+-]*@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|[a-zA-Z0-9.-]+\.edu\.in)$/;
    return emailPattern.test(email);
  };

  // Validate phone number (10 digits)
  const validatePhoneNumber = (phone) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  // Validate password complexity (minimum 8 characters with uppercase, lowercase, number, and special character)
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const formErrors = {};

    if (!formData.name) {
      formErrors.name = "Name is required.";
    } else if (!validateName(formData.name)) {
      formErrors.name = "Name cannot contain numbers or special characters.";
    }

    if (!formData.email) {
      formErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      formErrors.email = "Invalid email format.";
    }

    if (!formData.mobile_number) {
      formErrors.mobile_number = "Mobile number is required.";
    } else if (!validatePhoneNumber(formData.mobile_number)) {
      formErrors.mobile_number = "Mobile number must be 10 digits.";
    }

    if (!formData.password) {
      formErrors.password = "Password is required.";
    } else if (!validatePassword(formData.password)) {
      formErrors.password =
        "Password must be at least 8 characters long, with an uppercase letter, lowercase letter, number, and special character.";
    }

    if (!formData.confirm_password) {
      formErrors.confirm_password = "Please confirm your password.";
    } else if (formData.password !== formData.confirm_password) {
      formErrors.confirm_password = "Passwords do not match.";
    }

    if (!formData.gender) {
      formErrors.gender = "Gender is required.";
    }

    if (!formData.address) {
      formErrors.address = "Address is required.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set errors if validation fails
      return;
    }

    // If validation passes, proceed with API call
    try {
      const response = await axios.post(
        "http://localhost:3001/user/signup",
        formData,
        { withCredentials: true, credentials: "include" }
      );
      toast.success("Registered successfully!");
      setTimeout(() => {
        navigate("/user-login");
      }, 1000);
    } catch (error) {
      // Check if the error contains a response and a message
      const errorMessage =
        error.response && error.response.data && error.response.data.msg
          ? error.response.data.msg
          : "Error registering user.";
      toast.error(errorMessage); // Display the specific message from the backend
    }
  };

  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear specific field errors on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear individual field errors
    }));
  };

  return (
    <div className="flex min-h-screen">
      <HeroSection />
      <div className="w-1/2 flex items-center bg-white justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-3xl font-semibold text-black mb-4">Start Your Journey</h2>
          <p className="text-gray-600 mb-8">New to our platform? Register and connect with top local businesses.</p>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Name"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Mobile Number Field */}
            <div className="mb-4">
              <input
                type="text"
                name="mobile_number"
                onChange={handleChange}
                value={formData.mobile_number}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Mobile Number"
                required
              />
              {errors.mobile_number && <p className="text-red-500 text-sm">{errors.mobile_number}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                required
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                onChange={handleChange}
                value={formData.confirm_password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
                required
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}
            </div>

            {/* Gender Field */}
            <div className="mb-4">
              <select
                name="gender"
                onChange={handleChange}
                value={formData.gender}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
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
                onChange={handleChange}
                value={formData.address}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Address"
                rows="3"
                required
              ></textarea>
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <NavLink to="/user-login" className="text-blue-500">
              Login
            </NavLink>
          </p>
        </div>
      </div>
      <ToastContainerWrapper />
    </div>
  );
};

export default RegisterFormUser;
