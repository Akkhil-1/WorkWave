import React, { useState } from "react";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    offDays: "",
    contactEmail: "",
    contactPhone: "",
    businessLogo: null,
    businessImages: [],
  });

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
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
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.businessImages.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      businessImages: updatedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if businessLogo and businessImages are properly set
    if (!formData.businessLogo) {
      toast.error("Please upload a business logo");
      return;
    }

    if (formData.businessImages.length === 0) {
      toast.error("Please upload at least one business image");
      return;
    }

    // Create FormData for file upload
    const formDataToSubmit = new FormData();

    // Append all text fields
    Object.keys(formData).forEach((key) => {
      if (key !== "businessLogo" && key !== "businessImages") {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    // Append logo file
    if (formData.businessLogo) {
      formDataToSubmit.append("businessLogo", formData.businessLogo);
    }

    // Append multiple image files
    if (formData.businessImages.length > 0) {
      formData.businessImages.forEach((file) => {
        formDataToSubmit.append("businessImages", file);
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/business/addbusiness",
        formDataToSubmit,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      toast.success("Business Added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting business details:", error);
      toast.error(
        error.response?.data?.message || "Please Check the Details Carefully"
      );
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

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Form fields go here */}
              {[
                { label: "Business Name", name: "businessName", type: "text" },
                { label: "Business Type", name: "businessType", type: "text" },
                { label: "State", name: "state", type: "text" },
                { label: "City", name: "city", type: "text" },
                { label: "Pincode", name: "pincode", type: "text" },
                { label: "Full Address", name: "address", type: "textarea" },
                { label: "Opening Time", name: "openingTime", type: "time" },
                { label: "Closing Time", name: "closingTime", type: "time" },
                { label: "Off Days", name: "offDays", type: "text" },
                { label: "Contact Email", name: "contactEmail", type: "email" },
                { label: "Contact Phone", name: "contactPhone", type: "tel" },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-medium text-black">
                    {field.label} <span className="text-red-500">*</span>
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full p-3 text-sm bg-white rounded-lg border"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      rows="3"
                      required
                    />
                  ) : field.type === "time" ? (
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 h-4 w-4 text-black" />
                      <input
                        type="time"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full pl-10 p-3 text-sm bg-white rounded-lg border"
                        required
                      />
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full p-3 text-sm bg-white rounded-lg border"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      required
                    />
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-black">
                  Business Logo <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="businessLogo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-none file:text-sm file:font-semibold file:bg-purple-700 file:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">
                  Business Images <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="businessImages"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-none file:text-sm file:font-semibold file:bg-purple-700 file:text-white"
                  required
                />

                {/* Show added images */}
                {formData.businessImages.length > 0 && (
                  <div className="mt-4 flex gap-4">
                    {formData.businessImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`business-image-${index}`}
                          className="h-16 w-16 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
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
