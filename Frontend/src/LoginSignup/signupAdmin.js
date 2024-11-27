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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validatePhoneNumber = (phone) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  // Validate email format using regex
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Validate password length (6 characters minimum)
  const validatePasswordLength = (password) => {
    return password.length >= 6;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const formErrors = {};

    if (!formData.name) formErrors.name = "Name is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    else if (!validateEmail(formData.email))
      formErrors.email = "Invalid email format.";
    if (!formData.mobile_number)
      formErrors.mobile_number = "Mobile number is required.";
    else if (!validatePhoneNumber(formData.mobile_number))
      formErrors.mobile_number = "Mobile number must be 10 digits.";
    if (!formData.password) formErrors.password = "Password is required.";
    else if (!validatePasswordLength(formData.password))
      formErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirm_password)
      formErrors.confirm_password = "Passwords do not match.";
    if (!formData.gender) formErrors.gender = "Gender is required.";
    if (!formData.address) formErrors.address = "Address is required.";

    // Set errors and stop form submission if there are validation errors
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // If no errors, proceed with the API call
    try {
      const respo = await axios.post(
        "http://localhost:3001/admin/signup",
        formData,
        { withCredentials: true, credentials: "include" }
      );
      console.log(respo);
      toast.success("Registered Successfully");
      setTimeout(() => {
        navigate("/admin-login");
      }, 1000);
    } catch (e) {
      console.log(e);
      toast.error("Admin already exists.");
    }
  };

  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error on password or confirm password change without triggering the mismatch validation
    if (name === "password" || name === "confirm_password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: "", // Clear confirm_password mismatch error on any change
      }));
    }
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const formErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value) formErrors.name = "Name is required.";
        else delete formErrors.name;
        break;
      case "email":
        if (!value) formErrors.email = "Email is required.";
        else if (!validateEmail(value))
          formErrors.email = "Invalid email format.";
        else delete formErrors.email;
        break;
      case "mobile_number":
        if (!value) formErrors.mobile_number = "Mobile number is required.";
        else if (!validatePhoneNumber(value))
          formErrors.mobile_number = "Mobile number must be 10 digits.";
        else delete formErrors.mobile_number;
        break;
      case "password":
        if (!value) formErrors.password = "Password is required.";
        else if (!validatePasswordLength(value))
          formErrors.password = "Password must be at least 6 characters.";
        else delete formErrors.password;
        break;
      case "confirm_password":
        // Only check password mismatch when the user has finished typing and is moving to the next field
        if (formData.password && value && formData.password !== value) {
          formErrors.confirm_password = "Passwords do not match.";
        } else {
          delete formErrors.confirm_password; // Clear error if passwords match or user clears confirm_password field
        }
        break;
      case "gender":
        if (!value) formErrors.gender = "Gender is required.";
        else delete formErrors.gender;
        break;
      case "address":
        if (!value) formErrors.address = "Address is required.";
        else delete formErrors.address;
        break;
      default:
        break;
    }

    setErrors(formErrors);
  };

  return (
    <div className="flex min-h-screen">
      <HeroSection />
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <NavLink to={"/admin-login"} className="text-gray-600 mb-8">
            <div
              style={{
                display: "flex",
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
            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                onBlur={handleBlur} // Trigger validation on blur
                value={formData.name}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur} // Trigger validation on blur
                value={formData.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div className="mb-4">
              <input
                type="text"
                name="mobile_number"
                id="mobile_number"
                onChange={handleChange}
                onBlur={handleBlur} // Trigger validation on blur
                value={formData.mobile_number}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Mobile Number"
              />
              {errors.mobile_number && (
                <p className="text-red-500 text-sm">{errors.mobile_number}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur} // Trigger validation on blur
                value={formData.password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                onChange={handleChange}
                onBlur={handleBlur} // Trigger validation on blur
                value={formData.confirm_password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Confirm Password"
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm">
                  {errors.confirm_password}
                </p>
              )}
            </div>

            {/* Gender Field (Dropdown) */}
            <div className="mb-4">
              <select
                name="gender"
                id="gender"
                onChange={handleChange}
                onBlur={handleBlur} // Trigger validation on blur
                value={formData.gender}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>

            {/* Address Field */}
            <div className="mb-4">
              <input
                type="text"
                name="address"
                id="address"
                onChange={handleChange}
                onBlur={handleBlur} // Trigger validation on blur
                value={formData.address}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?
            <NavLink
              to="/admin-login"
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
