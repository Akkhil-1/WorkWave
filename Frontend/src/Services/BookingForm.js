import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import backgroundImage from "../assets/roadmap/bookingFormbkg.jpg";

const BookingForm = () => {
  const { id, serviceId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    mobileNumber: "",
    guestCount: "",
    bookingDate: "",
    bookingTime: "",
    customerNotes: "",
    serviceId: serviceId,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation functions
  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name); // No numbers or special characters
  const validateEmail = (email) =>
    /^[a-zA-Z][a-zA-Z0-9._%+-]*@(gmail\.com|[a-zA-Z0-9.-]+\.edu\.in)$/.test(email); // Specific email domains
  const validatePhoneNumber = (number) => /^[0-9]{10}$/.test(number); // Exactly 10 digits

  const validateBookingDate = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate > today; // Ensure the booking date is in the future
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear specific field errors on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate fields
    const formErrors = {};
    if (!formData.name) {
      formErrors.name = "Name is required.";
    } else if (!validateName(formData.name)) {
      formErrors.name = "Name cannot contain numbers or special characters.";
    }

    if (!formData.email) {
      formErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      formErrors.email = "Invalid email format";
    }

    if (!formData.mobileNumber) {
      formErrors.mobileNumber = "Mobile number is required.";
    } else if (!validatePhoneNumber(formData.mobileNumber)) {
      formErrors.mobileNumber = "Mobile number must be exactly 10 digits.";
    }

    if (!formData.bookingDate) {
      formErrors.bookingDate = "Booking date is required.";
    } else if (!validateBookingDate(formData.bookingDate)) {
      formErrors.bookingDate = "Booking date must be at least one day after today.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    // Submit form if no validation errors
    try {
      const response = await fetch(
        `http://localhost:3001/booking/addbooking/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...formData }),
        }
      );

      if (response.ok) {
        console.log("Booking submitted successfully");
        alert("Booking done!");
        setFormData({
          name: "",
          email: "",
          dateOfBirth: "",
          mobileNumber: "",
          guestCount: "",
          bookingDate: "",
          bookingTime: "",
          customerNotes: "",
        });
      } else {
        const errorData = await response.text();
        const errorJson = JSON.parse(errorData);
        console.error("Failed to submit booking", errorJson);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen">
      <div className="flex w-full">
        <div className="relative w-2/3 h-screen">
          <img
            src={backgroundImage}
            alt="Booking Background"
            className="absolute inset-0 w-full h-full object-cover filter brightness-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
              initial="hidden"
              animate="visible"
              className="text-center text-white p-8 rounded-xl max-w-xl bg-black/40"
            >
              <motion.h1 className="text-5xl font-bold mb-4">
                Book Your Experience
              </motion.h1>
              <motion.p className="text-xl mb-4">
                Create unforgettable moments with our premium services
              </motion.p>
              <motion.p className="text-md opacity-80">
                Choose your preferred date, time, and service
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-1/3 bg-white/90 p-8 h-screen overflow-y-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="w-full space-y-6"
          >
            <motion.h2 className="text-2xl font-bold text-violet-900 mb-8 border-b-2 border-violet-200 pb-2">
              Booking Details
            </motion.h2>

            {[ 
              { label: "Name", name: "name", type: "text", error: errors.name },
              { label: "Email", name: "email", type: "email", error: errors.email },
              { label: "Date of Birth", name: "dateOfBirth", type: "date" },
              { label: "Mobile Number", name: "mobileNumber", type: "tel", error: errors.mobileNumber },
              { label: "Number of Guests", name: "guestCount", type: "number" },
              { label: "Booking Date", name: "bookingDate", type: "date", error: errors.bookingDate },
              { label: "Booking Time", name: "bookingTime", type: "time" },
            ].map((field) => (
              <motion.div
                key={field.name}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 ease-in-out hover:border-violet-400"
                  required
                />
                {field.error && <p className="text-red-500 text-sm">{field.error}</p>}
              </motion.div>
            ))}

            <motion.div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="customerNotes"
                value={formData.customerNotes}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 ease-in-out hover:border-violet-400"
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-lg text-white font-medium transition-all duration-200 ease-in-out ${
                isLoading
                  ? "bg-violet-400 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-700"
              } shadow-lg hover:shadow-xl`}
              disabled={isLoading}
            >
              {isLoading ? "Booking..." : "Confirm Booking"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
