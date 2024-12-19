import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logosaas.png";
import { FaHome ,FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { User, Calendar, MessageSquare } from "lucide-react";
import { toast } from "react-toastify"; // Ensure you have toast notifications set up

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log("Razorpay script loaded successfully.");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script.");
    };
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRazorpayPayment = async (amount, bookingId) => {
    try {
      // Ensure Razorpay script is loaded
      if (typeof window.Razorpay === "undefined") {
        throw new Error("Razorpay script not loaded");
      }

      // Request to your backend to create a Razorpay order
      const response = await axios.post(
        "https://workwave-aage.onrender.com/orders", // Adjust the URL to your backend endpoint
        {
          amount: amount * 100, // Convert the amount to paise (Razorpay works in paise)
          currency: "INR", // Currency for the payment
        },
        { withCredentials: true } // Pass cookies if needed for authentication
      );

      const { order_id, currency, amount: orderAmount } = response.data;

      // Initialize Razorpay payment options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay key
        amount: orderAmount, // Amount received from backend (in paise)
        currency: currency,
        name: "WorkWave",
        description: "Payment for booking",
        image: logo,
        order_id: order_id, // Use the orderId from the backend
        handler: async function (paymentResponse) {
          // Payment was successful
          alert("Payment successful!");

          // Send the paymentId and bookingId to the backend to update the payment status
          await updateBookingStatus(
            paymentResponse.razorpay_payment_id,
            bookingId
          );
        },
        prefill: {
          name: userData.name || "Guest",
          email: userData.email || "guest@example.com",
        },
        theme: {
          color: "#166534",
        },
      };

      // Open Razorpay's payment window
      const razorpayObject = new window.Razorpay(options);
      razorpayObject.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
      alert("Failed to initiate payment.");
    }
  };

  const updateBookingStatus = async (paymentId, bookingId) => {
    try {
      const updatedBookings = [...bookings];
      // Optimistically update the payment status
      const bookingIndex = updatedBookings.findIndex(
        (booking) => booking._id === bookingId
      );
      if (bookingIndex !== -1) {
        updatedBookings[bookingIndex].paymentStatus = "Paid";
      }
      setBookings(updatedBookings); // Optimistically update UI

      // Make the API call to update the payment status in the backend
      const response = await axios.put(
        "https://workwave-aage.onrender.com/booking/updatePayment", // Correct endpoint for updating payment
        {
          paymentId, // Send paymentId
          bookingId, // Send bookingId
          paymentStatus: "Paid", // Send paymentStatus
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Payment status updated successfully!");
      } else {
        throw new Error("Failed to update payment status");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);

      // Revert the UI update in case of error (optional)
      const updatedBookings = [...bookings];
      const bookingIndex = updatedBookings.findIndex(
        (booking) => booking._id === bookingId
      );
      if (bookingIndex !== -1) {
        updatedBookings[bookingIndex].paymentStatus = "Pending"; // Revert to previous status
        updatedBookings[bookingIndex].status = "Pending"; // Revert booking status
      }
      setBookings(updatedBookings);

      toast.error("Failed to update payment status!");
    }
  };
  const sendMessage = () => {
    alert("In Future!")
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
              <p className="text-indigo-200">
                {userData.address || "New York"}
              </p>
              <p className="text-indigo-200">
                {userData.mobile_number || "+1 789 885 929"}
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
                        ${
                          activeTab === id
                            ? "border-b-2 border-indigo-800 text-indigo-600"
                            : "text-gray-600 hover:text-indigo-400"
                        }`}
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
                            {booking.businessName ||
                              booking.business?.businessName ||
                              booking.business?.name ||
                              "Unknown Business"}
                          </td>
                          <td className="py-4">
                            {booking.serviceName ||
                              booking.service?.name ||
                              booking.service?.serviceName ||
                              "Unknown Service"}
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
                                onClick={() =>
                                  handleRazorpayPayment(
                                    booking.service.price,
                                    booking._id
                                  )
                                }
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
            {activeTab === "messages" && (
                <div className="w-full bg-white text-black rounded-lg shadow-md p-6 flex flex-col h-[400px]">
                  <div className="flex flex-col h-full">
                    <h5 className="text-xl font-semibold">Messages</h5>
                    <div className="flex flex-col gap-4 mt-4 flex-grow overflow-y-auto border-t pt-4">
                      {messages.map((msg, index) => (
                        <div key={index} className="flex justify-start gap-2">
                          <FaUserCircle className="text-xl text-gray-500" />
                          <div className="p-2 rounded-lg bg-gray-200">
                            {msg.content}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center mt-4 border-t pt-4">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-grow p-2 border rounded-lg"
                        placeholder="Type a message"
                      />
                      <button
                        onClick={sendMessage}
                        className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
                      >
                        Send
                      </button>
                    </div>
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
