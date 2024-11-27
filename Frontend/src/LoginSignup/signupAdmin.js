import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import HeroSection from "./HeroSection";
import Toast, { ToastContainerWrapper } from "./Helper/ToastNotify";
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
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });
  const [isSubmit, setIsSubmit] = useState(false); // Track whether submit was clicked

  const navigate = useNavigate();

  // Advanced email validation regex
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z][a-zA-Z0-9._%+-]*@([a-zA-Z0-9.-]+\.)*((edu\.in))$/;
    return emailPattern.test(email);
  };

  // Password validation regex
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const validateName = (name) => {
    const namePattern = /^[A-Za-z\s]+$/; 
    return namePattern.test(name);
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true); // Set to true when the user clicks submit

    const formErrors = {};

    if (!formData.name) {
      formErrors.name = "Name is required.";
    } else if (!validateName(formData.name)) {
      formErrors.name = "Name cannot contain numbers and special characters.";
    }

    if (!formData.email) {
      formErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      formErrors.email = "Invalid email format. Use .edu.in domain and don't start with a number.";
    }

    if (!formData.mobile_number) {
      formErrors.mobile_number = "Mobile number is required.";
    } else if (!validatePhoneNumber(formData.mobile_number)) {
      formErrors.mobile_number = "Mobile number must be 10 digits.";
    }

    if (!formData.password) {
      formErrors.password = "Password is required.";
    } else if (!validatePassword(formData.password)) {
      formErrors.password = "Password must be at least 8 characters with uppercase, lowercase, number, and special character.";
    }

    if (!formData.confirm_password) {
      formErrors.confirm_password = "Please confirm your password.";
    } else if (formData.password !== formData.confirm_password) {
      formErrors.confirm_password = "Passwords do not match.";
    }

    if (!formData.gender) formErrors.gender = "Gender is required.";
    if (!formData.address) formErrors.address = "Address is required.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const respo = await axios.post(
        "http://localhost:3001/admin/signup",
        formData,
        { withCredentials: true, credentials: "include" }
      );
      toast.success("Registered Successfully");
      setTimeout(() => {
        navigate("/admin-login");
      }, 1000);
    } catch (e) {
      toast.error("Admin already exists.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }

    if (name === "password" || name === "confirm_password") {
      const newErrors = { ...errors };
      delete newErrors.confirm_password;
      setErrors(newErrors);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="flex min-h-screen">
      <HeroSection />
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <NavLink to={"/admin-login"} className="text-gray-600 mb-8">
            <img src={homeIcon} alt="Home Icon" style={{ width: "auto", height: "auto" }} />
          </NavLink>
          <h2 className="text-3xl font-semibold mb-4">Get Started with Us!</h2>
          <p className="text-gray-600 mb-8">New to our platform? Register today to connect with local clients.</p>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={formData.name}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Name"
              />
              {isSubmit && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={formData.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
              />
              {isSubmit && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div className="mb-4">
              <input
                type="text"
                name="mobile_number"
                id="mobile_number"
                onChange={handleChange}
                value={formData.mobile_number}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Mobile Number"
              />
              {isSubmit && errors.mobile_number && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile_number}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <input
                type={showPassword.password ? "text" : "password"}
                name="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('password')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword.password ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {isSubmit && errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4 relative">
              <input
                type={showPassword.confirm_password ? "text" : "password"}
                name="confirm_password"
                id="confirm_password"
                onChange={handleChange}
                value={formData.confirm_password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm_password')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword.confirm_password ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {isSubmit && errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
              )}
            </div>

            {/* Gender Selection */}
            <div className="mb-4">
              <select
                name="gender"
                id="gender"
                onChange={handleChange}
                value={formData.gender}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {isSubmit && errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Address Field */}
            <div className="mb-4">
              <textarea
                name="address"
                id="address"
                onChange={handleChange}
                value={formData.address}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Address"
              />
              {isSubmit && errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="px-6 py-2 text-white bg-indigo-500 rounded-md"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
