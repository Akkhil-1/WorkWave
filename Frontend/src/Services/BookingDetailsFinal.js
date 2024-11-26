import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { fetchBusinessDetails } from "./fetchBusinessDetails";
import { fetchServiceDetails } from "./fetchServiceData";

const FinalBusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBusinessDetails = async () => {
      try {
        const businessRes = await fetchBusinessDetails(id); // Make sure this function fetches data from the backend API
        setBusiness(businessRes.data); // Store the response
        console.log(businessRes);
        const serviceRes = await Promise.all(
          businessRes.data.services.map(async (s) => {
            const tempRes = await fetchServiceDetails(s);
            return tempRes.data;
          })
        );

        setService(serviceRes);
        console.log(serviceRes);
      } catch (err) {
        setError("Failed to fetch business details");
      } finally {
        setLoading(false);
      }
    };

    getBusinessDetails();
  }, [id]);

  if (loading) return <p>Loading business details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!business) return <p>No business details available</p>;

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row">
        {/* Business Logo */}
        <div className="md:w-1/3 p-4">
          <img
            src={
              business.businessLogo ||
              "https://via.placeholder.com/150?text=No+Logo"
            }
            alt={business.businessName}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Business Details */}
        <div className="md:w-2/3 p-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            {/* Business Name */}
            <h1 className="text-4xl font-extrabold text-[#591B5F] mb-4">
              {business.businessName}
            </h1>

            {/* Address Section */}
            <div className="flex items-start mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#591B5F] mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0-7c4.97 0 9 4.03 9 9 0 2.92-1.56 5.4-3.88 7.09L12 21l-5.12-3.91C4.56 17.4 3 14.92 3 12c0-4.97 4.03-9 9-9z"
                />
              </svg>
              <p className="text-lg text-gray-700">
                {business.address}, {business.city}, {business.state},{" "}
                {business.pincode}
              </p>
            </div>

            {/* Opening Hours */}
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#591B5F] mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-9a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Opening Hours:</span>{" "}
                {business.openingTime} - {business.closingTime}
              </p>
            </div>

            {/* Off Days */}
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#591B5F] mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8h18M9 3h6m-7 18h8M3 12h18m-9-9v18"
                />
              </svg>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Off Days:</span>{" "}
                {business.offDays || "None"}
              </p>
            </div>

            {/* Contact Details */}
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#591B5F] mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8h18M9 3h6m-7 18h8M3 12h18m-9-9v18"
                />
              </svg>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Contact:</span>{" "}
                {business.contactPhone} | {business.contactEmail}
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Services</h2>
            {service?.length > 0 ? (
              service.map((service) => (
                <div
                  key={service._id}
                  className="border p-4 mb-4 rounded-lg shadow-md bg-gray-50 text-gray-700"
                >
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <p className="mb-2">
                    Description:{" "}
                    {service.description || "No description provided"}
                  </p>
                  <p className="mb-2 font-bold">Price: ${service.price}</p>
                  <NavLink
                    to={`/business/service/bookingform/${id}/${service._id}`}
                  >
                    <button className="mt-2 bg-[#591B5F] text-white py-2 px-4 rounded">
                      Book Now
                    </button>
                  </NavLink>
                </div>
              ))
            ) : (
              <p>No services available.</p>
            )}
          </div>
        </div>
      </div>
      {/* Business Images Section */}
      <div className="my-10">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#591B5F]">Gallery</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Explore the ambiance and services we offer through our gallery.
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {business.businessImages?.length > 0 ? (
            business.businessImages.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={image}
                  alt={`Business Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                {/* Optional overlay for hover effect */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No images available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalBusinessDetails;
