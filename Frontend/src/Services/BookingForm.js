import React, { useState } from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/roadmap/bookingFormbkg.jpg'
const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    mobileNumber: '',
    guestCount: '',
    bookingDate: '',
    bookingTime: '',
    customerNotes: ''
  });

  const [focused, setFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1500));
  //   setIsLoading(false);
  //   console.log(formData);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch('http://localhost:3001/booking/business/addbooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Booking submitted successfully');
        // Optionally reset the form
        setFormData({
          name: '',
          email: '',
          dateOfBirth: '',
          mobileNumber: '',
          guestCount: '',
          bookingDate: '',
          bookingTime: '',
          customerNotes: ''
        });
      } else {
        console.error('Failed to submit booking');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Animation variants for text
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Content Container */}
      <div className="flex w-full">
        {/* Image Section with Centered Text */}
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
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-center text-white p-8 rounded-xl max-w-xl bg-black/40"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl font-bold mb-4"
              >
                Book Your Experience
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl mb-4"
              >
                Create unforgettable moments with our premium services
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-md opacity-80"
              >
                Choose your preferred date, time, and service
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Form Section */}
        <div className="w-1/3 bg-white/90 p-8 h-screen overflow-y-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="w-full space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-bold text-violet-900 mb-8 border-b-2 border-violet-200 pb-2"
            >
              Booking Details
            </motion.h2>

            {/* Input Fields */}
            {[
              { label: 'Name', name: 'name', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
              { label: 'Mobile Number', name: 'mobileNumber', type: 'tel' },
              { label: 'Number of Guests', name: 'guestCount', type: 'number' },
              { label: 'Booking Date', name: 'bookingDate', type: 'date' },
              { label: 'Booking Time', name: 'bookingTime', type: 'time' },
            ].map((field) => (
              <motion.div
                key={field.name}
                variants={itemVariants}
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
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300
                            focus:ring-2 focus:ring-violet-500 focus:border-violet-500
                            transition-all duration-200 ease-in-out
                            hover:border-violet-400"
                  required
                />
              </motion.div>
            ))}

            {/* Notes Textarea */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="customerNotes"
                value={formData.customerNotes}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300
                           focus:ring-2 focus:ring-violet-500 focus:border-violet-500
                           transition-all duration-200 ease-in-out
                           hover:border-violet-400"
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-lg text-white font-medium
                         transition-all duration-200 ease-in-out
                         ${isLoading
                           ? 'bg-violet-400 cursor-not-allowed'
                           : 'bg-violet-600 hover:bg-violet-700'
                         }
                         shadow-lg hover:shadow-violet-500/50`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </div>
              ) : (
                'Book Now'
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;