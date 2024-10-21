import React, { useState } from "react";
import pic from "./pic.jpg";
import axios from "axios";
import toast from "react-hot-toast";
function BookingForm() {
  const [formData, setFormData] = useState({
    name : "",
    age: "",
    email: "",
    mobile_number: "",
    guest: "",
    bookingDate: "",
    bookingTime: "",
    status: "",
    customerNotes: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const respo = await axios.post(
        "http://localhost:3001/booking/business/addbooking",
        formData,{ withCredentials: true, credentials: "include" }
      );
      console.log(respo);
      toast.success("Booking Done");
    } catch (e) {
      toast.error("Error");
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
    <div className="flex justify-center items-center min-h-screen bg-[#f9f2fa]">
      <div className="bg-white p-6 rounded-lg border-4 border-white max-w-3xl w-full mt-3 overflow-hidden shadow-lg">
        <div className="mb-5">
          <img
            src={pic}
            alt="Booking"
            className="w-full h-64 rounded-t-lg object-cover"
          />
          <h2 className="text-center text-2xl mb-3">Booking Form</h2>
          <p className="text-center mb-2">
            Experience something new every moment
          </p>
          <hr className="mb-4" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              placeholder="First Name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 bg-white text-gray-700 border border-gray-400 rounded-md flex-1"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              id="name"
              value={formData.age}
              onChange={handleChange}
              className="p-2 bg-white text-gray-700 border border-gray-400 rounded-md flex-1"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 bg-white text-gray-700 border border-gray-400 rounded-md flex-2"
            />
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              name="mobile_number"
              placeholder="Mobile Number"
              id="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              className="p-2 bg-white text-gray-700 border border-gray-400 rounded-md flex-1"
            />
            <input
              type="text"
              name="guest"
              placeholder="Guest"
              id="guest"
              value={formData.guest}
              onChange={handleChange}
              className="p-2 bg-white text-gray-700 border border-gray-400 rounded-md flex-1"
            />
          </div>

          <div className="flex gap-4">
            <input
              type="date"
              name="bookingDate"
              id="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              className="p-2 bg-white text-gray-700 border border-gray-400 rounded-md flex-1"
            />
            <input
              type="time"
              name="bookingTime"
              id="bookingTime"
              value={formData.bookingTime}
              onChange={handleChange}
              className="p-2 bg-white text-gray-700 border border-gray-400 rounded-md flex-1"
            />
          </div>

          {/* <div className="flex">
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="p-2 bg-white text-gray-700 border border-gray-400 rounded-md w-full"
            >
              <option value="">Status</option>
              <option value={formData.}>Confirmed</option>
              <option value={formData.status}>Cancelled</option>
              <option value={formData.status}>Completed</option>
            </select>
          </div> */}

          <div>
            <input
              type="text"
              name="customerNotes"
              id="customerNotes"
              placeholder="Description"
              value={formData.customerNotes}
              onChange={handleChange}
              className="p-2 bg-white text-gray-700 border border-gray-400 rounded-md w-full h-24 resize-vertical"
            />
          </div>
          <button
            type="submit"
            className="w-52 p-2 bg-[#591B5F] text-white mt-7 mx-auto text-lg font-semibold rounded-lg hover:bg-[#411246]"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
