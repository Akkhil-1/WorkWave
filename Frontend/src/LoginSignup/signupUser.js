// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";
// import HeroSection from "./HeroSectionUser";
// import Toast, { ToastContainerWrapper } from "./Helper/ToastNotify"; // Import Toast and ToastContainerWrapper
// import toast from "react-hot-toast";
// import homeIcon from "./icons8-home-24.png";

// const RegisterFormUser = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile_number: "",
//     password: "",
//     confirm_password: "",
//     gender: "",
//     address: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [passwordMatch, setPasswordMatch] = useState(true); // Password match state
//   const navigate = useNavigate();

//   // Email validation (simple regex)
//   const validateEmail = (email) => {
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return emailPattern.test(email);
//   };

//   // Phone number validation (10 digits)
//   const validatePhoneNumber = (phone) => {
//     const phonePattern = /^[0-9]{10}$/;
//     return phonePattern.test(phone);
//   };

//   // Password length validation
//   const validatePasswordLength = (password) => {
//     return password.length >= 6;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form data
//     const formErrors = {};

//     if (!formData.name) formErrors.name = "Name is required.";
//     if (!formData.email) formErrors.email = "Email is required.";
//     else if (!validateEmail(formData.email)) formErrors.email = "Invalid email format.";
//     if (!formData.mobile_number) formErrors.mobile_number = "Mobile number is required.";
//     else if (!validatePhoneNumber(formData.mobile_number)) formErrors.mobile_number = "Mobile number must be 10 digits.";
//     if (!formData.password) formErrors.password = "Password is required.";
//     else if (!validatePasswordLength(formData.password)) formErrors.password = "Password must be at least 6 characters.";
//     if (formData.password !== formData.confirm_password) formErrors.confirm_password = "Passwords do not match.";
//     if (!formData.gender) formErrors.gender = "Gender is required.";
//     if (!formData.address) formErrors.address = "Address is required.";

//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors); // Set errors if validation fails
//       return;
//     }

//     // If validation passes, proceed with API call
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/user/signup",
//         formData,
//         { withCredentials: true, credentials: "include" }
//       );
//       toast.success("Registered successfully!");
//       setTimeout(() => {
//         navigate("/user-login");
//       }, 1000);
//     } catch (error) {
//       toast.error("Error registering user.");
//     }
//   };

//   // Handle change for form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     // Password match validation
//     if (name === "password" || name === "confirm_password") {
//       setPasswordMatch(formData.password === formData.confirm_password);
//     }

//     // Clear specific field errors on change
//     if (name === "email" || name === "mobile_number" || name === "password") {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "", // Clear individual field errors
//       }));
//     }
//   };

//   // Handle onBlur for real-time validation
//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     const formErrors = { ...errors };

//     switch (name) {
//       case "name":
//         if (!value) formErrors.name = "Name is required.";
//         else delete formErrors.name;
//         break;
//       case "email":
//         if (!value) formErrors.email = "Email is required.";
//         else if (!validateEmail(value)) formErrors.email = "Invalid email format.";
//         else delete formErrors.email;
//         break;
//       case "mobile_number":
//         if (!value) formErrors.mobile_number = "Mobile number is required.";
//         else if (!validatePhoneNumber(value)) formErrors.mobile_number = "Mobile number must be 10 digits.";
//         else delete formErrors.mobile_number;
//         break;
//       case "password":
//         if (!value) formErrors.password = "Password is required.";
//         else if (!validatePasswordLength(value)) formErrors.password = "Password must be at least 6 characters.";
//         else delete formErrors.password;
//         break;
//       case "confirm_password":
//         // Only check password mismatch when the user has finished typing and is moving to the next field
//         if (formData.password && value && formData.password !== value) {
//           formErrors.confirm_password = "Passwords do not match.";
//         } else {
//           delete formErrors.confirm_password; // Clear error if passwords match or user clears confirm_password field
//         }
//         break;
//       case "gender":
//         if (!value) formErrors.gender = "Gender is required.";
//         else delete formErrors.gender;
//         break;
//       case "address":
//         if (!value) formErrors.address = "Address is required.";
//         else delete formErrors.address;
//         break;
//       default:
//         break;
//     }

//     setErrors(formErrors);
//   };

//   return (
//     <div className="flex min-h-screen">
//       <HeroSection />
//       <div className="w-1/2 flex items-center bg-white justify-center">
//         <div className="w-full max-w-md p-8">
//           <NavLink to="/" className="text-gray-600 mb-8">
//             <div style={{ display: "flex", alignItems: "left", justifyContent: "center", height: "auto" }}>
//               {/* <img src={homeIcon} alt="Home Icon" style={{ width: "auto", height: "auto" }} /> */}
//             </div>
//           </NavLink>
//           <h2 className="text-3xl font-semibold text-black mb-4">Start Your Journey</h2>
//           <p className="text-gray-600 mb-8">New to our platform? Register and connect with top local businesses.</p>
//           <form onSubmit={handleSubmit}>
//             {/* Name Field */}
//             <div className="mb-4">
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 onChange={handleChange}
//                 value={formData.name}
//                 onBlur={handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Name"
//                 required
//               />
//               {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//             </div>

//             {/* Email Field */}
//             <div className="mb-4">
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 onChange={handleChange}
//                 value={formData.email}
//                 onBlur={handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Email"
//                 required
//               />
//               {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//             </div>

//             {/* Mobile Number Field */}
//             <div className="mb-4">
//               <input
//                 type="text"
//                 name="mobile_number"
//                 id="mobile_number"
//                 onChange={handleChange}
//                 value={formData.mobile_number}
//                 onBlur={handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Mobile Number"
//                 required
//               />
//               {errors.mobile_number && <p className="text-red-500 text-sm">{errors.mobile_number}</p>}
//             </div>

//             {/* Password Field */}
//             <div className="mb-4">
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 onChange={handleChange}
//                 value={formData.password}
//                 onBlur={handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Password"
//                 required
//               />
//               {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//             </div>

//             {/* Confirm Password Field */}
//             <div className="mb-4">
//               <input
//                 type="password"
//                 name="confirm_password"
//                 id="confirm_password"
//                 onChange={handleChange}
//                 value={formData.confirm_password}
//                 onBlur={handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Confirm Password"
//                 required
//               />
//               {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}
//             </div>

//             {/* Gender Field */}
//             <div className="mb-4">
//               <select
//                 name="gender"
//                 id="gender"
//                 onChange={handleChange}
//                 value={formData.gender}
//                 onBlur={handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//               {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
//             </div>

//             {/* Address Field */}
//             <div className="mb-4">
//               <textarea
//                 name="address"
//                 id="address"
//                 onChange={handleChange}
//                 value={formData.address}
//                 onBlur={handleBlur}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Address"
//                 required
//               ></textarea>
//               {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
//             </div>

//             {/* Submit Button */}
//             <div className="flex items-center justify-between mt-6">
//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Register
//               </button>
//             </div>
//           </form>
//           <ToastContainerWrapper /> {/* Ensure to wrap Toast notifications */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterFormUser;



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
      toast.error("Error registering user.");
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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
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
                required
              ></textarea>
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default RegisterFormUser;