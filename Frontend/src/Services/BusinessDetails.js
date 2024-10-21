import React, { useState } from "react";
import { useParams } from "react-router-dom";
import businesses from "./BusinessesData";
import { NavLink } from "react-router-dom";
import Header from '../AdminLandingPage/Header';
import Footer from '../AdminLandingPage/Footer';

const BusinessDetails = () => {
  const { id } = useParams();
  const business = businesses.find((biz) => biz._id === id);

  const [activeTab, setActiveTab] = useState("services");

  if (!business) {
    return <div>Business not found</div>;
  }

  return (
    <div>
      {/* Header at the top */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto p-4 bg-white">
        <div className="flex flex-col md:flex-row text-black">
          <div className="md:w-1/3 p-4">
            <img
              src={business.businessLogo}
              alt={business.businessName}
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-2/3 p-4">
            <h1 className="text-2xl font-bold mb-2">{business.businessName}</h1>
            <p className="text-gray-700 mb-2">
              {business.address}, {business.city}, {business.state},{" "}
              {business.pincode}
            </p>
            <p className="text-gray-700 mb-2">
              Opening Hours: {business.openingTime} - {business.closingTime}
            </p>
            <p className="text-gray-700 mb-2">Off Days: {business.offDays}</p>
            <p className="text-gray-700 mb-4">
              Contact: {business.contactPhone} | {business.contactEmail}
            </p>

            {/* Tabs Navigation */}
            <div className="mb-4">
              <ul className="flex border-b border-gray-300">
                <li className="mr-1">
                  <button
                    className={`py-2 px-4 block ${
                      activeTab === "services"
                        ? "border-b-2 border-[#591B5F] text-[#591B5F]"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("services")}
                  >
                    Services
                  </button>
                </li>
                <li className="mr-1">
                  <button
                    className={`py-2 px-4 block ${
                      activeTab === "photos"
                        ? "border-b-2 border-[#591B5F] text-[#591B5F]"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("photos")}
                  >
                    Photos
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 block ${
                      activeTab === "reviews"
                        ? "border-b-2 border-[#591B5F] text-[#591B5F]"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews
                  </button>
                </li>
              </ul>
            </div>

            {/* Tab Content */}
            {activeTab === "services" && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Services</h2>
                {business.services.map((service, index) => (
                  <div
                    key={index}
                    className="border p-4 mb-2 rounded-lg shadow-sm bg-gray-50 text-gray-700"
                  >
                    <h3 className="text-lg font-semibold">{service.serviceName}</h3>
                    <p>Duration: {service.duration}</p>
                    <p>Seats Available: {service.noOfSeats}</p>
                    <p>Description: {service.serviceDescription}</p>
                    <p>Price: ${service.servicePrice}</p>
                    <NavLink to="/BookingForm">  
                      <button className="mt-2 bg-[#591B5F] text-white py-2 px-4 rounded">
                          Book Now
                      </button>
                    </NavLink>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "photos" && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Photos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {business.businessImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Reviews</h2>
                {/* Placeholder for reviews. Replace with dynamic data as needed */}
                <div className="border p-4 rounded-lg shadow-sm bg-gray-50 text-gray-700">
                  <p>"Great service and friendly staff!" - Jane Doe</p>
                  <p>"Very professional and clean environment." - John Smith</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default BusinessDetails;
