import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSection from "./HeroSectionUser";
import Toast, { ToastContainerWrapper } from "./Helper/ToastNotify";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

// Import Eye and EyeOff icons from lucide-react
import { Eye, EyeOff } from "lucide-react";

const LoginFormUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const navigate = useNavigate();

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
  };

  return (
    <div className="flex min-h-screen">
      <HeroSection />
      <div className="w-1/2 bg-center flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-white">
          {/* Back to Home Button */}
          <div className="mb-[20px] text-center mr-[230px]">
            <NavLink
              to="/user-landingpage"
              className="text-blue-500 hover:text-blue-700 text-lg font-semibold"
            >
              &lt; Back to Home
            </NavLink>
          </div>

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
                value={formData.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label
                className="block text-sm font-bold text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}  // Toggle password visibility
                onChange={handleChange}
                value={formData.password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                placeholder="Password"
              />
              {/* Eye icon button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-[-2px] text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
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
