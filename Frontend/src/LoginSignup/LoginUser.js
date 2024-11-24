import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSection from "./HeroSectionUser";
import Toast, { ToastContainerWrapper } from "./Helper/ToastNotify";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

const LoginFormUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Email validation (regex)
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Password length validation
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle OTP page navigation
  const otpPage = async () => {
    const { email } = formData;

    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/otp/sendOtp", { email });
      toast.success("OTP sent successfully!");
      navigate("/user-forgot-password", { state: { email } });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("User not found.");
      } else {
        toast.error("Failed to send OTP.");
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const formErrors = {};

    if (!formData.email) {
      formErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      formErrors.email = "Invalid email format.";
    }

    if (!formData.password) {
      formErrors.password = "Password is required.";
    } else if (!validatePassword(formData.password)) {
      formErrors.password = "Password must be at least 6 characters.";
    }

    // If there are validation errors, set errors and return
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const respo = await axios.post(
        "http://localhost:3001/user/login",
        formData,
        { withCredentials: true, credentials: "include" }
      );

      // Check if login was successful and role was returned
      if (respo.data.role) {
        Cookies.set('role', respo.data.role, { expires: 1 });
        toast.success("User logged in successfully!");
        
        if (respo.data.role === 'user') {
          navigate("/user-landingpage");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Role not found in response!");
      }
    } catch (e) {
      toast.error("Error logging in");
    }
  };

  // Handle input field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear errors on field change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear specific field error
    }));
  };

  // Handle onBlur for field validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const formErrors = { ...errors };

    switch (name) {
      case "email":
        if (!value) formErrors.email = "Email is required.";
        else if (!validateEmail(value)) formErrors.email = "Invalid email format.";
        else delete formErrors.email;
        break;
      case "password":
        if (!value) formErrors.password = "Password is required.";
        else if (!validatePassword(value)) formErrors.password = "Password must be at least 6 characters.";
        else delete formErrors.password;
        break;
      default:
        break;
    }

    setErrors(formErrors);
  };

  return (
    <div className="flex min-h-screen">
      <HeroSection />
      <div className="w-1/2 bg-center flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-white">
          <NavLink to="/" className="text-gray-600 mb-8">
            <div
              style={{
                display: "flex",
                height: "auto",
              }}
            >
              {/* Optional Home Icon */}
            </div>
          </NavLink>
          <h2 className="text-3xl font-semibold mb-4 text-black">
            Ready to Dive Back In?
          </h2>
          <p className="text-gray-600 mb-8">
            Enter your credentials to pick up right where you left off.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}  // Trigger validation on blur
                value={formData.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                className="block text-sm font-bold text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}  // Trigger validation on blur
                value={formData.password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-between mb-6">
              <div
                className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer"
                onClick={otpPage}
              >
                Forgot Password?
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md"
            >
              Log in
            </button>
          </form>

          {/* Sign-up Redirect */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Don't have an account?
            <NavLink
              to="/user-signup"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Sign up for free
            </NavLink>
          </p>
        </div>
      </div>
      <ToastContainerWrapper />
    </div>
  );
};

export default LoginFormUser;
