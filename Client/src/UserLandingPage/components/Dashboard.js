import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import logo from "../assets/logosaas.png";

import {
  User,
  Calendar,
  MessageSquare,
  LogOut,
  CreditCard,
  CheckCircle,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Replace these URLs with your actual API endpoints
        console.log("Fetching user data...");
        const userResponse = await axios.get(
          "http://localhost:3001/usdashboard/user",
          {
            withCredentials: true,
          }
        );
        console.log("User data:", userResponse.data);
        const bookingsResponse = await axios.get(
          "http://localhost:3001/usdashboard/bookings",
          {
            withCredentials: true,
          }
        );


        // const transactionsResponse = await axios.get('http://localhost:5000/transactions');
        // const completedResponse = await axios.get('http://localhost:5000/completed');

        setUserData(userResponse.data);
        setBookings(bookingsResponse.data.bookings);
        // setTransactions(transactionsResponse.data);
        // setCompleted(completedResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-indigo-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div>
        {/* Header */}
        <div className="bg-indigo-600 p-4 rounded-lg mb-6 backdrop-blur-sm shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 flex items-center justify-center">
                <img src={logo} alt="saaslogo" height={40} width={40} />
              </div>
              <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
            </div>
            {/* <button className="flex items-center gap-2 px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-900">
              <LogOut className="h-4 w-4" /> Log out
            </button> */}
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
                  {
                    id: "transactions",
                    icon: CreditCard,
                    label: "Transactions",
                  },
                  // { id: 'completed', icon: CheckCircle, label: 'Completed' },
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
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-indigo-300">
                          <th className="text-left pb-4 text-gray-700">
                            Business Name
                          </th>
                          <th className="text-left pb-4 text-gray-700">
                            Service
                          </th>
                          <th className="text-left pb-4 text-gray-700">Date</th>
                          <th className="text-left pb-4 text-gray-700">Time</th>
                          <th className="text-left pb-4 text-gray-700">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking, index) => {
                          return (
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
                              <td className="py-4">{booking.bookingDate}</td>
                              <td className="py-4">{booking.bookingTime}</td>
                              <td className="py-4">
                                <span className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded-full text-sm">
                                  {booking.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Transactions Tab */}
              {activeTab === "transactions" && (
                <div className="animate-fadeIn">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-indigo-300">
                          <th className="text-left pb-4 text-gray-700">
                            Transaction ID
                          </th>
                          <th className="text-left pb-4 text-gray-700">
                            Amount
                          </th>
                          <th className="text-left pb-4 text-gray-700">Date</th>
                          <th className="text-left pb-4 text-gray-700">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction, index) => (
                          <tr
                            key={index}
                            className="border-b border-indigo-300 text-gray-700"
                          >
                            <td className="py-4">{transaction.id}</td>
                            <td className="py-4">{transaction.amount}</td>
                            <td className="py-4">{transaction.date}</td>
                            <td className="py-4">
                              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                                {transaction.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Completed Tab */}
              {activeTab === "completed" && (
                <div className="animate-fadeIn">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-indigo-300">
                          <th className="text-left pb-4 text-gray-700">
                            Business Name
                          </th>
                          <th className="text-left pb-4 text-gray-700">Date</th>
                          <th className="text-left pb-4 text-gray-700">Time</th>
                          <th className="text-left pb-4 text-gray-700">
                            Rating
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {completed.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b border-indigo-300 text-gray-700"
                          >
                            <td className="py-4">{item.business}</td>
                            <td className="py-4">{item.date}</td>
                            <td className="py-4">{item.time}</td>
                            <td className="py-4">{item.rating}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === "messages" && (
                <div className="animate-fadeIn">
                  <p className="text-gray-700">No messages to display.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
