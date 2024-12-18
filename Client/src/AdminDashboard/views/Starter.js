import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import ProjectTables from "../components/dashboard/ProjectTableDash";
import TopCards from "../components/dashboard/TopCards";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";

const fetchServiceName = async (serviceId) => {
  console.log("Fetching service name for serviceId:", serviceId);
  try {
    const response = await fetch(`https://workwave-aage.onrender.com/services/name/${serviceId}`,{
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch service name");
    }

    const data = await response.json();
    return data.serviceName; // Assuming the response has a 'serviceName' field
  } catch (error) {
    console.error("Error fetching service name:", error);
    return null;
  }
};

const Starter = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [bookingsData, setBookingsData] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceNames, setServiceNames] = useState({});

  // Fetch bookings data and load from localStorage
  useEffect(() => {
    const fetchBookingsData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://workwave-aage.onrender.com/business/getBookings`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        const booking = data;

        // Sort bookings based on 'createdAt' or another time-based field (latest booking first)
        const sortedBookings = booking.bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Get deleted bookings from localStorage and filter them out
        const deletedBookingIds = JSON.parse(localStorage.getItem("deletedBookingIds")) || [];
        const filteredBookings = sortedBookings.filter(booking => !deletedBookingIds.includes(booking._id));

        // Set the latest 5 bookings
        setBookingsData(filteredBookings.slice(0, 5));
        setTotalBookings(sortedBookings.length);
        setFetchError(false);

        // Save bookingsData to localStorage after fetching
        localStorage.setItem("countBookings", filteredBookings.length);
        localStorage.setItem("bookingsData", JSON.stringify(filteredBookings.slice(0, 5)));

        // Fetch service names for each booking
        const serviceNamesObj = {};
        for (let booking of filteredBookings) {
          if (booking.service && !serviceNamesObj[booking.service]) {
            const serviceName = await fetchServiceName(booking.service);
            if (serviceName) {
              serviceNamesObj[booking.service] = serviceName;
            }
          }
        }
        setServiceNames(serviceNamesObj);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setFetchError(true);
        setBookingsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingsData();

    // Check if there's any data in localStorage and load it
    const storedBookings = localStorage.getItem("bookingsData");
    if (storedBookings) {
      setBookingsData(JSON.parse(storedBookings));
    }
  }, []); // Empty dependency array ensures the effect runs once on component mount.

  // Function to remove a specific notification and store the deleted ID
  const removeNotification = (idToRemove) => {
    const updatedBookings = bookingsData.filter(booking => booking._id !== idToRemove);
    setBookingsData(updatedBookings);

    // Store the deleted booking ID in localStorage
    const deletedBookingIds = JSON.parse(localStorage.getItem("deletedBookingIds")) || [];
    if (!deletedBookingIds.includes(idToRemove)) {
      deletedBookingIds.push(idToRemove);
      localStorage.setItem("deletedBookingIds", JSON.stringify(deletedBookingIds));
    }

    // Update localStorage with the new bookings data
    localStorage.setItem("countBookings", updatedBookings.length);
    localStorage.setItem("bookingsData", JSON.stringify(updatedBookings));
  };

  return (
    <div>
      {/* Notification Button */}
      <div className="relative flex justify-end p-4">
        <button
          className="relative p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md"
          onClick={() => setShowNotification(!showNotification)}
        >
          <i className="bi bi-bell text-2xl text-white"></i>
          {bookingsData.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {bookingsData.length}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {showNotification && (
          <div className="absolute top-16 right-4 bg-white border border-gray-200 rounded-xl shadow-2xl w-96 max-h-[400px] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
              <h4 className="text-lg font-semibold p-4 pb-2 text-gray-800">
                Latest Bookings
              </h4>
            </div>
            
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                <p>Loading bookings...</p>
              </div>
            ) : fetchError ? (
              <div className="p-4 bg-red-50 text-red-600 text-sm text-center">
                Error: Failed to load bookings
              </div>
            ) : bookingsData.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {bookingsData.map((booking) => (
                  <div
                    key={booking._id}
                    className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        <span className="font-semibold">{booking.name || 'Unknown Client'}</span> booked{" "}
                        <br />
                        <span className="font-semibold">{serviceNames[booking.service] || 'Service'}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.bookingDate ? new Date(booking.bookingDate).toLocaleString() : 'No date specified'}
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
              <div className="p-4 text-center text-gray-500">
                <p>No bookings available</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Top Cards */}
      <Row className="gap-6 flex flex-col sm:flex-row justify-center">
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-red-100 text-red-600"
            title="Refunds"
            subtitle="Monthly Earning"
            earning="₹1k"
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-yellow-100 text-yellow-600"
            title="New Project"
            subtitle="Total Bookings"
            earning={`${totalBookings}`}
            icon="bi bi-basket3"
          />
        </Col>
      </Row>

      {/* Sales Chart */}
      <Row className="gap-6 flex flex-col sm:flex-row justify-center">
        <Col sm="6" lg="6" xl="7" className="w-[650px]">
          <SalesChart />
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
