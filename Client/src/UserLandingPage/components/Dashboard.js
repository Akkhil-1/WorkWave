import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logosaas.png";
import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  User,
  Calendar,
  MessageSquare,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseId, setResponseId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user and bookings data
        const userResponse = await axios.get(
          "https://workwave-aage.onrender.com/usdashboard/user",
          { withCredentials: true }
        );
        const bookingsResponse = await axios.get(
          "https://workwave-aage.onrender.com/usdashboard/bookings",
          { withCredentials: true }
        );

        setUserData(userResponse.data);
        setBookings(bookingsResponse.data.bookings);

        // Check if there's a payment ID and booking ID in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get('payment_id');
        const bookingId = urlParams.get('booking_id');

        if (paymentId && bookingId) {
          // Payment was successful, update status
          await updateBookingStatus(paymentId, bookingId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e, booking) => {
    e.preventDefault();
    if (!booking.service || !booking.service.price) {
      alert("Service details are missing or incorrect. Please try again.");
      return;
    }

    try {
      const invoiceData = {
        totalAmount: booking.service.price,
        status: "PAID",
        service: booking.service.name,
        user: userData.name || "Guest",
      };

      await handleRazorpayScreen(
        invoiceData.totalAmount,
        booking.id
      );
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Failed to create invoice. Please try again.");
    }
  };

  const handleRazorpayScreen = async (amount, bookingId) => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Error loading Razorpay screen");
        return;
      }

      const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        alert("Razorpay API key is missing.");
        return;
      }

      const options = {
        key: razorpayKey,
        amount: amount * 100,
        currency: "INR",
        name: "WorkWave",
        description: "Payment to WORKWAVE",
        image: logo,
        handler: function (response) {
          setResponseId(response.razorpay_payment_id);
          alert("Payment successful!");

          // Redirect to the same page with payment details in URL
          window.location.href = `${window.location.origin}/user-dashboard?payment_id=${response.razorpay_payment_id}&booking_id=${bookingId}`;
        },
        prefill: {
          name: userData.name || "Guest",
          email: userData.email || "guest@example.com",
        },
        theme: {
          color: "#166534",
        },
        modal: {
          ondismiss: function () {
            alert("Payment window closed.");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error loading Razorpay payment screen:", error);
      alert("Failed to load Razorpay payment screen");
    }
  };

  const updateBookingStatus = async (paymentId, bookingId) => {
    try {
      // Update status in the backend
      await axios.put(
        `https://workwave-aage.onrender.com/usdashboard/bookings/${bookingId}`,
        { status: "Paid", paymentStatus: "Paid" },
        { withCredentials: true }
      );

      // Update frontend state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, paymentStatus: "Paid", status: "Completed" }
            : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-indigo-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-indigo-600 p-4 rounded-lg mb-6 backdrop-blur-sm shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 flex items-center justify-center">
              <img src={logo} alt="saaslogo" height={40} width={40} />
            </div>
            <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-900">
            <NavLink to="/user-landingpage">
              <FaHome className="h-4 w-4" />
            </NavLink>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* User Profile Card */}
        <div className="bg-indigo-600 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-black p-4 rounded-full hover:scale-110 transform transition-all">
              <User className="h-12 w-12 text-white" />
            </div>
            <div className="text-center">
              <h2 className="font-semibold text-lg text-white">
                {userData.name || "John Doe"}
              </h2>
              <p className="text-indigo-200">
                {userData.email || "john@gmail.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-3">
          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-4 border-b border-indigo-500">
              {[
                { id: "bookings", icon: Calendar, label: "Bookings" },
                { id: "messages", icon: MessageSquare, label: "Messages" },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 transition-all duration-300
                        ${activeTab === id ? "border-b-2 border-indigo-800 text-indigo-600" : "text-gray-600 hover:text-indigo-400"}`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-indigo-50 rounded-lg shadow-lg p-6">
            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div className="animate-fadeIn">
                <div className="overflow-x-auto">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="border-b border-indigo-300">
                        <th className="pb-4 text-gray-700">Business Name</th>
                        <th className="pb-4 text-gray-700">Service</th>
                        <th className="pb-4 text-gray-700">Price</th>
                        <th className="pb-4 text-gray-700">Date</th>
                        <th className="pb-4 text-gray-700">Time</th>
                        <th className="pb-4 text-gray-700">Status</th>
                        <th className="pb-4 text-gray-700">Payment Status</th>
                        <th className="pb-4 text-gray-700"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, index) => (
                        <tr
                          key={index}
                          className="border-b border-indigo-300 text-gray-700"
                        >
                          <td className="py-4">
                            {booking.businessName || "Unknown Business"}
                          </td>
                          <td className="py-4">
                            {booking.serviceName || "Unknown Service"}
                          </td>
                          <td className="py-4">
                            {booking.service?.price
                              ? `₹${booking.service.price.toFixed(2)}`
                              : "N/A"}
                          </td>
                          <td className="py-4">{booking.bookingDate}</td>
                          <td className="py-4">{booking.bookingTime}</td>
                          <td className="py-4">
                            <span className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded-full text-sm">
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                booking.paymentStatus === "Paid"
                                  ? "bg-green-200 text-green-800"
                                  : "bg-red-200 text-red-800"
                              }`}
                            >
                              {booking.paymentStatus || "Pending"}
                            </span>
                          </td>
                          <td className="py-4">
                            {booking.paymentStatus === "Paid" ? (
                              <span className="px-4 py-2 bg-green-600 text-white rounded-lg">
                                Payment Received
                              </span>
                            ) : (
                              <button
                                onClick={(e) => handleSubmit(e, booking)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800"
                              >
                                Pay: ₹{booking.service.price}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
