import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserUpdateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    gender: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // State to store the user ID

  // Fetch user info from the API on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1];
        const response = await axios.get('http://localhost:3001/admin/admin-profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data;
        setUserId(user._id); // Extract user ID
        setFormData({
          name: user.name || '',
          email: user.email || '',
          mobile_number: user.mobile_number || '',
          gender: user.gender || '',
          address: user.address || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert('User ID is missing!');
      return;
    }
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1];
      const response = await axios.post(`http://localhost:3001/admin/update-admin/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      
      console.log('Profile updated:', response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-black rounded-lg shadow-lg">
      <h2 className="text-center text-2xl text-gray-300 mb-6">Update Your Information</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="space-y-1">
          <label htmlFor="name" className="text-white text-sm">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-white text-sm">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Mobile Number */}
        <div className="space-y-1">
          <label htmlFor="mobileNumber" className="text-white text-sm">Mobile Number</label>
          <input
            type="tel"
            id="mobile_number"
            name="mobile_number" // Ensure the name is correct here
            value={formData.mobile_number}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Gender */}
        <div className="space-y-1">
          <label htmlFor="gender" className="text-white text-sm">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Address */}
        <div className="space-y-1">
          <label htmlFor="address" className="text-white text-sm">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            rows="4"
            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Update Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateForm;
