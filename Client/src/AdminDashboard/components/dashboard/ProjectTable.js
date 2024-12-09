import React, { useEffect, useState } from "react";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import axios from "axios";

const imageData = [
  { avatar: user1 },
  { avatar: user2 },
  { avatar: user3 },
  { avatar: user4 },
  { avatar: user5 },
];

const ProjectTables = ({ businessId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/business/getBookings`,
          { withCredentials: true }
        );
        console.log(response.data);
        setBookings(response.data.bookings); // assuming `response.data.bookings` contains the list of bookings
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bookings");
        setLoading(false);
        console.log("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, [businessId]); // Re-fetch if businessId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Function to handle the change in status
  const handleStatusChange = (index, event) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = event.target.value;
    setBookings(updatedBookings);
  };

  // Helper function to get the background color based on status
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-400";
      case "Cancel":
        return "bg-red-600";
      case "confirmed":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h5 className="text-2xl font-semibold mb-2 text-black text-center">
          Bookings List
        </h5>
        <p className="text-sm text-gray-500 mb-4 text-center">
          Overview of the bookings
        </p>

        <table className="min-w-full table-auto text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Client Name</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Email</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Mobile Number</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Guest</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Booking Time</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Date of Booking</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-start">
                    <img
                      src={imageData[index % imageData.length].avatar}
                      className="rounded-full w-12 h-12"
                      alt="avatar"
                    />
                    <div className="ml-3 text-start">
                      <h6 className="text-sm font-medium text-black">
                        {booking.name}
                      </h6>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-black">{booking.email}</td>
                <td className="py-4 px-4 text-sm text-black">{booking.mobileNumber}</td>
                <td className="py-4 px-4 text-sm text-black">{booking.guestCount}</td>
                <td className="py-4 px-4 text-sm text-black">{booking.bookingTime}</td>
                <td className="py-4 px-4 text-sm text-black">{booking.bookingDate}</td>
                <td className="py-4 px-4 text-center">
                  <select
                    value={booking.status}
                    onChange={(event) => handleStatusChange(index, event)}
                    className={`px-3 py-1 rounded-full border text-md ${getStatusClass(booking.status)}`}
                  >
                    <option value="pending" className="text-black">Pending</option>
                    <option value="Cancel" className="text-black">Cancel</option>
                    <option value="confirmed" className="text-black">Confirmed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTables;
