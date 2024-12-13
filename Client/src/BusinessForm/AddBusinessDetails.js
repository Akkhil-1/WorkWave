import React, { useState } from "react";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const AddBusinessDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    landmark: "Near the location",
    businessType: "",
    openingTime: "",
    closingTime: "",
    offDays: [],
    contactEmail: "",
    contactPhone: "",
    businessLogo: null,
    businessImages: [],
  });

  const handleRemoveImage = (index) => {
    const updatedImages = formData.businessImages.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      businessImages: updatedImages,
    }));
  };

  const handleChange = (e) => {
    const { name, type, files, value, checked } = e.target;

    if (name === "businessName" || name === "state" || name === "city" || name === "businessType") {
      if (/[^a-zA-Z\s]/.test(value)) return; // Restrict alphabetic input
    }

    if (name === "pincode" || name === "contactPhone") {
      if (/[^0-9]/.test(value)) return; // Restrict numeric input
    }

    if (type === "file") {
      if (name === "businessImages") {
        setFormData((prev) => ({
          ...prev,
          businessImages: [...prev.businessImages, ...files],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      }
    } else if (type === "checkbox") {
      setFormData((prev) => {
        const newOffDays = checked ? [...prev.offDays, value] : prev.offDays.filter((day) => day !== value);
        return { ...prev, offDays: newOffDays };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const allowedEmails = [
      /@gmail\.com$/,
      /@yahoo\.com$/,
      /@chitkara\.edu\.in$/,
    ];

    const trimmedFormData = {
      ...formData,
      businessName: formData.businessName.trim(),
      address: formData.address.trim(),
      state: formData.state.trim(),
      city: formData.city.trim(),
      pincode: formData.pincode.trim(),
      businessType: formData.businessType.trim(),
      contactEmail: formData.contactEmail.trim(),
      contactPhone: formData.contactPhone.trim(),
      openingTime: formData.openingTime.trim(),
      closingTime: formData.closingTime.trim(),
      landmark: formData.landmark.trim(),
    };

    // Validation checks (business name, pincode, etc.)

    if (/\d/.test(trimmedFormData.businessName)) {
      toast.error("Business name should not contain numbers.");
      isValid = false;
    } else if (trimmedFormData.businessName.length < 3 || trimmedFormData.businessName.length > 20) {
      toast.error("Business name should be between 3 and 20 characters.");
      isValid = false;
    }

    const alphabeticRegex = /^[a-zA-Z\s]+$/;
    if (!alphabeticRegex.test(trimmedFormData.businessName)) {
      toast.error("Business name should only contain alphabets.");
      isValid = false;
    }
    if (!alphabeticRegex.test(trimmedFormData.state)) {
      toast.error("State should only contain alphabets.");
      isValid = false;
    }
    if (!alphabeticRegex.test(trimmedFormData.city)) {
      toast.error("City should only contain alphabets.");
      isValid = false;
    }
    if (!alphabeticRegex.test(trimmedFormData.businessType)) {
      toast.error("Business type should only contain alphabets.");
      isValid = false;
    }

    const openingTime = trimmedFormData.openingTime ? new Date(`1970-01-01T${trimmedFormData.openingTime}Z`) : null;
    const closingTime = trimmedFormData.closingTime ? new Date(`1970-01-01T${trimmedFormData.closingTime}Z`) : null;

    if (!openingTime || !closingTime || closingTime <= openingTime) {
      toast.error("Closing time must be after opening time.");
      isValid = false;
    }

    const businessHours = (closingTime - openingTime) / (1000 * 60 * 60);
    if (businessHours < 5) {
      toast.error("Business must be open for at least 5 hours.");
      isValid = false;
    }

    if (trimmedFormData.offDays.length === 0) {
      toast.error("Please select at least one off day.");
      isValid = false;
    }

    if (trimmedFormData.offDays.length === 7) {
      toast.error("You cannot select all off days. Please choose fewer days.");
      isValid = false;
    }

    if (!/^\d{6}$/.test(trimmedFormData.pincode)) {
      toast.error("Pincode must be exactly 6 digits.");
      isValid = false;
    }

    if (/^\d/.test(trimmedFormData.contactEmail)) {
      toast.error("Email must not start with a number.");
      isValid = false;
    } else if (!/^[a-zA-Z][\w.-]*@[a-zA-Z]+\.[a-zA-Z]{2,6}$/.test(trimmedFormData.contactEmail)) {
      toast.error("Email format is invalid.");
      isValid = false;
    } else if (!allowedEmails.some((regex) => regex.test(trimmedFormData.contactEmail))) {
      toast.error("Email domain is not allowed.");
      isValid = false;
    }

    if (!/^\d{10}$/.test(trimmedFormData.contactPhone)) {
      toast.error("Phone number must be 10 digits.");
      isValid = false;
    }

    if (!trimmedFormData.businessLogo) {
      toast.error("Please upload a business logo.");
      isValid = false;
    }

    if (trimmedFormData.businessImages.length === 0) {
      toast.error("Please upload at least one business image.");
      isValid = false;
    }

    if (!isValid) return;

    const formDataToSubmit = new FormData();
    Object.keys(trimmedFormData).forEach((key) => {
      if (key !== "businessLogo" && key !== "businessImages") {
        formDataToSubmit.append(key, trimmedFormData[key]);
      }
    });

    if (trimmedFormData.businessLogo) {
      formDataToSubmit.append("businessLogo", trimmedFormData.businessLogo);
    }

    if (trimmedFormData.businessImages.length > 0) {
      trimmedFormData.businessImages.forEach((file) => {
        formDataToSubmit.append("businessImages", file);
      });
    }

    const [cookies] = useCookies(["token"]);

    try {
      const response = await axios.post(
        "https://workwave-aage.onrender.com/business/addbusiness",
        formDataToSubmit,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log(response);
      toast.success("Business Added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting business details:", error);
      toast.error(error.response?.data?.message || "Please Check the Details Carefully");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex text-black">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-[65%] bg-cover bg-center bg-no-repeat fixed h-screen"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-purple-950 opacity-60"></div>
      </motion.div>

      {/* Right side - Form Section */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-[35%] ml-[65%]"
      >
        <div className="min-h-screen bg-white shadow-lg overflow-y-auto">
          <div className="p-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-gray-900 mb-8 text-center"
            >
              Business Details
            </motion.h2>

            <motion.form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full p-3 text-sm bg-white rounded-lg border"
                  placeholder="Enter business name"
                  required
                />
              </div>

              {/* Business Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Business Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full p-3 text-sm bg-white rounded-lg border"
                  placeholder="Enter business type"
                  required
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 text-sm bg-white rounded-lg border"
                  placeholder="Enter address"
                  rows="4"
                  required
                />
              </div>

              {/* City and State */}
              <div className="flex gap-4">
                <div className="w-1/2 space-y-2">
                  <label className="block text-sm font-medium text-black">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-3 text-sm bg-white rounded-lg border"
                    placeholder="Enter state"
                    required
                  />
                </div>

                <div className="w-1/2 space-y-2">
                  <label className="block text-sm font-medium text-black">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-3 text-sm bg-white rounded-lg border"
                    placeholder="Enter city"
                    required
                  />
                </div>
              </div>

              {/* Pincode */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full p-3 text-sm bg-white rounded-lg border"
                  placeholder="Enter pincode"
                  required
                />
              </div>

              {/* Business Logo */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Upload Business Logo <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="businessLogo"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full p-3 text-sm bg-white rounded-lg border"
                  required
                />
              </div>

              {/* Business Images */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Upload Business Images <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="businessImages"
                  onChange={handleChange}
                  accept="image/*"
                  multiple
                  className="w-full p-3 text-sm bg-white rounded-lg border"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="bg-purple-600 text-white py-2 px-6 rounded-full"
                >
                  Submit
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddBusinessDetails;
