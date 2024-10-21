import React, { useState } from "react";
// import businessImage from "./business.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate } from "react-router-dom";
const AddBusinessDetails = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    landmark: "",
    businessType: "",
    openingTime: "",
    closingTime: "",
    offDays: "",
    contactEmail: "",
    contactPhone: "",
    businessLogo: "",
    businessImages: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respo = await axios.post(
        "http://localhost:3001/business/addbusiness",
        { businessData: formData },
        { withCredentials: true, credentials: "include" }
      );
      console.log(respo);
      toast.success("Business Added successfully");
      navigate("/");
    } catch (error) {
      console.log("Error is " + error);

      toast.error("Please Check the Details Carefully");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0C17]">
      {/* Right side with form */}
      <div className="flex flex-col justify-center px-2 md:p-8 w-full md:w-1/2 bg-gradient-to-b from-[#4A1B73] via-[#591857] to-[#0F0C17] text-white rounded-lg my-2 py-10 space-y-4">
        <span className="mb-0 text-3xl font-bold">Add Business Details</span>
        <span className="font-light text-gray-400 mb-6">
          Welcome! Please enter your business details
        </span>
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <label className="mb-0 text-md flex items-center">
              Business Name <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="businessName"
              id="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              placeholder="Enter your business name"
              required
            />
          </div>
          {/* Address */}
          <div className="py-2">
            <label className="mb-1 text-md flex items-center">
              Address <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              placeholder="Enter your address"
              required
            />
          </div>
          {/* State, City, Pincode */}
          <div className="flex space-x-2 py-2">
            <div className="w-1/3">
              <label className="mb-1 text-md flex items-center">
                State <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                placeholder="Enter your state"
                required
              />
            </div>
            <div className="w-1/3">
              <label className="mb-1 text-md flex items-center">
                City <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                placeholder="Enter your city"
                required
              />
            </div>
            <div className="w-1/3">
              <label className="mb-1 text-md flex items-center">
                Pincode <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                id="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                placeholder="Enter your pincode"
                required
              />
            </div>
          </div>
          {/* Landmark */}
          <div className="py-2">
            <label className="mb-1 text-md flex items-center">
              Landmark <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="landmark"
              id="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              placeholder="Enter a nearby landmark"
              required
            />
          </div>
          {/* Business Type */}
          <div className="py-2">
            <label className="mb-1 text-md flex items-center">
              Business Type <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="businessType"
              id="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              placeholder="Enter your business type"
              required
            />
          </div>
          {/* Opening Time, Closing Time, Off Days */}
          <div className="flex space-x-2 py-2">
            <div className="w-1/3">
              <label className="mb-1 text-md flex items-center">
                Opening Time <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="time"
                name="openingTime"
                id="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                required
              />
            </div>
            <div className="w-1/3">
              <label className="mb-1 text-md flex items-center">
                Closing Time <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="time"
                name="closingTime"
                id="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                required
              />
            </div>
            <div className="w-1/3">
              <label className="mb-1 text-md flex items-center">
                Off Days <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="offDays"
                id="offDays"
                value={formData.offDays}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                placeholder="Enter off days"
                required
              />
            </div>
          </div>
          {/* Contact Email, Contact Phone */}
          <div className="flex space-x-2 py-2">
            <div className="w-1/2">
              <label className="mb-1 text-md flex items-center">
                Contact Email <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                name="contactEmail"
                id="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                placeholder="Enter your contact email"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="mb-1 text-md flex items-center">
                Contact Phone <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="contactPhone"
                id="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                placeholder="Enter your contact phone"
                required
              />
            </div>
          </div>
          {/* Business Logo, Business Images */}
          <div className="py-2">
            <label className="mb-1 text-md flex items-center">
              Business Logo <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="file"
              name="businessLogo"
              id="businessLogo"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="py-2">
            <label className="mb-1 text-md flex items-center">
              Business Images <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="file"
              name="businessImages"
              id="businessImages"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="py-4">
            <button
              type="submit"
              className="w-full bg-[#6C46A2] p-2 rounded-md text-white hover:bg-[#4A1B73] transition-all duration-300"
            >
              Add Business
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBusinessDetails;
