import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import ProjectTables from "../components/dashboard/ProjectTableDash";
import TopCards from "../components/dashboard/TopCards";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";

// Helper function to fetch the service details
const fetchServiceDetails = async (serviceId) => {
  try {
    const response = await fetch(
      `https://workwave-aage.onrender.com/services/${serviceId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch service details");
    }

    return await response.json(); // Assuming response contains service details, including price
  } catch (error) {
    console.error("Error fetching service details:", error);
    return null;
  }
};

// Starter Component
const Starter = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [bookingsData, setBookingsData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceNames, setServiceNames] = useState({});

  // Fetch bookings data
  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://workwave-aage.onrender.com/business/getBookings`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        const booking = data;

        // Sort bookings by date
        const sortedBookings = booking.bookings.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Filter out deleted bookings
        const deletedBookingIds =
          JSON.parse(localStorage.getItem("deletedBookingIds")) || [];
        const filteredBookings = sortedBookings.filter(
          (booking) => !deletedBookingIds.includes(booking._id)
        );

        setBookingsData(filteredBookings.slice(0, 5));
        setTotalBookings(filteredBookings.length);
        setFetchError(false);

        // Calculate total earnings
        let earnings = 0;
        const serviceNamesObj = {};
        for (let booking of filteredBookings) {
          if (booking.service) {
            const serviceData = await fetchServiceDetails(booking.service);
            if (serviceData) {
              if (serviceData.price) {
                earnings += serviceData.price;
              }
              serviceNamesObj[booking.service] = serviceData.name || "Service";
            }
          }
        }
        setTotalEarnings(earnings);
        setServiceNames(serviceNamesObj);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setFetchError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingsData();
  }, []);

  // Remove a specific notification
  const removeNotification = (idToRemove) => {
    const updatedBookings = bookingsData.filter(
      (booking) => booking._id !== idToRemove
    );
    setBookingsData(updatedBookings);

    const deletedBookingIds =
      JSON.parse(localStorage.getItem("deletedBookingIds")) || [];
    if (!deletedBookingIds.includes(idToRemove)) {
      deletedBookingIds.push(idToRemove);
      localStorage.setItem(
        "deletedBookingIds",
        JSON.stringify(deletedBookingIds)
      );
    }
  };

  return (
    <div>
      <div className="text-center py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 shadow-md rounded-lg">
        <h1 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">
          Admin Dashboard
        </h1>
      </div>
      {/* Top Cards */}
      <Row className="gap-6 flex flex-col sm:flex-row justify-center">
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-red-100 text-red-600"
            title="Refunds"
            subtitle="Total Earnings"
            earning={`₹${totalEarnings}`}
            icon="bi bi-coin"
          />
        </Col>
        <TopCards
          bg="bg-yellow-100 text-yellow-600"
          title="New Bookings"
          subtitle="Pending Bookings"
          earning={`${
            bookingsData.filter((booking) => booking.status === "Pending")
              .length
          }`}
          icon="bi bi-basket3"
        />

        <Col sm="6" lg="3">
          <TopCards
            bg="bg-blue-100 text-blue-600"
            title="Total Bookings"
            subtitle="Total Bookings"
            earning={`${totalBookings}`}
            icon="bi bi-basket3"
          />
        </Col>
      </Row>

      {/* Sales Chart */}
      <Row className="gap-6 flex flex-col sm:flex-row justify-center">
        {/* Sales Chart */}
        <Col sm="6" lg="6" xl="7" className="w-[650px]">
          <SalesChart />
        </Col>

        {/* Recent Notifications */}
        <Col
          sm="6"
          lg="6"
          xl="7"
          className="w-[650px] bg-white shadow-lg rounded-lg border border-gray-200"
        >
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
            <h3 className="text-lg font-semibold">Recent Notifications</h3>
          </div>
          <div className="p-4 space-y-3">
            {isLoading ? (
              <div className="text-center text-gray-500">
                Loading bookings...
              </div>
            ) : fetchError ? (
              <div className="bg-red-50 text-red-600 text-sm text-center p-4 rounded-md">
                Error: Failed to load bookings
              </div>
            ) : bookingsData.length > 0 ? (
              <div className="space-y-3">
                {bookingsData.map((booking) => (
                  <div
                    key={booking._id}
                    className="p-4 flex items-center justify-between bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        <span className="font-semibold text-blue-600">
                          {booking.name || "Unknown Client"}
                        </span>{" "}
                        booked{" "}
                        <span className="font-semibold text-purple-600">
                          {serviceNames[booking.service] || "Service"}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.bookingDate
                          ? new Date(booking.bookingDate).toLocaleString()
                          : "No date specified"}
                      </p>
                    </div>
                    <button
                      onClick={() => removeNotification(booking._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                      aria-label="Remove notification"
                    >
                      <i className="bi bi-x-circle text-lg"></i>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>No bookings available</p>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Project Table */}
      <Row className="mt-6">
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
