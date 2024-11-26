import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { fetchBusinessDetails } from "./fetchBusinessDetails";

const BusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBusinessDetails = async () => {
      try {
        const businessData = await fetchBusinessDetails(id);
        setBusiness(businessData);
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
              business.data.businessLogo ||
              "https://via.placeholder.com/150?text=No+Logo"
            }
            alt={business.data.businessName}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Business Details */}
        <div className="md:w-2/3 p-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            {/* Business Name */}
            <h1 className="text-4xl font-extrabold text-[#591B5F] mb-4">
              {business.data.businessName}
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
                {business.data.address}, {business.data.city},{" "}
                {business.data.state}, {business.data.pincode}
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
                {business.data.openingTime} - {business.data.closingTime}
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
                {business.data.offDays || "None"}
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
                {business.data.contactPhone} | {business.data.contactEmail}
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Services</h2>
            {business.data.services?.length > 0 ? (
              business.data.services.map((service) => (
                <div
                  key={service._id}
                  className="border p-4 mb-4 rounded-lg shadow-md bg-gray-50 text-gray-700"
                >
                  <h3 className="text-xl font-semibold">
                    {service.serviceName}
                  </h3>
                  <p className="mb-2">Duration: {service.duration || "N/A"}</p>
                  <p className="mb-2">
                    Seats Available: {service.noOfSeats || "N/A"}
                  </p>
                  <p className="mb-2">
                    Description:{" "}
                    {service.description || "No description provided"}
                  </p>
                  <p className="mb-2 font-bold">Price: ${service.price}</p>
                  <NavLink to={`/business/servive/bookingform`}>
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
          {business.data.businessImages?.length > 0 ? (
            business.data.businessImages.map((image, index) => (
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

export default BusinessDetails;
// import React, { useEffect, useState } from "react";
// import { useParams, NavLink } from "react-router-dom";
// import { fetchBusinessDetails } from "./fetchBusinessDetails";

// const BusinessDetails = () => {
//   const { id } = useParams();
//   const [business, setBusiness] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getBusinessDetails = async () => {
//       try {
//         const businessData = await fetchBusinessDetails(id);
//         setBusiness(businessData);
//       } catch (err) {
//         setError("Failed to fetch business details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getBusinessDetails();
//   }, [id]);

//   if (loading) return <p>Loading business details...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!business) return <p>No business details available</p>;

//   return (
//     <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
//       <div className="flex flex-col md:flex-row">
//         {/* Business Logo */}
//         <div className="md:w-1/3 p-4">
//           <img
//             src={business.data.businessLogo || "https://via.placeholder.com/150?text=No+Logo"}
//             alt={business.data.businessName}
//             className="w-full h-auto rounded-lg"
//           />
//         </div>

//         {/* Business Details */}
//         <div className="md:w-2/3 p-4">
//           <h1 className="text-3xl font-bold mb-2">{business.data.businessName}</h1>
//           <p className="text-gray-600 mb-2">
//             {business.data.address}, {business.data.city}, {business.data.state}, {business.data.pincode}
//           </p>
//           <p className="text-gray-600 mb-2">
//             Opening Hours: {business.data.openingTime} - {business.data.closingTime}
//           </p>
//           <p className="text-gray-600 mb-2">Off Days: {business.data.offDays || "None"}</p>
//           <p className="text-gray-600 mb-4">
//             Contact: {business.data.contactPhone} | {business.data.contactEmail}
//           </p>
//         </div>
//       </div>

//       {/* Services Section */}
//       <div className="my-6">
//         <h2 className="text-2xl font-semibold mb-4">Services</h2>
//         {business.data.services?.length > 0 ? (
//           business.data.services.map((service) => (
//             <div
//               key={service._id}
//               className="border p-4 mb-4 rounded-lg shadow-md bg-gray-50 text-gray-700"
//             >
//               <h3 className="text-xl font-semibold">{service.serviceName}</h3>
//               <p className="mb-2">Description: {service.description || "No description provided"}</p>
//               <p className="mb-2 font-bold">Price: ${service.price}</p>
//               <NavLink to={`/business/service/bookingform/${service._id}`}>
//                 <button className="mt-2 bg-[#591B5F] text-white py-2 px-4 rounded">
//                   Book Now
//                 </button>
//               </NavLink>
//             </div>
//           ))
//         ) : (
//           <p>No services available.</p>
//         )}
//       </div>

//       {/* Business Images Section */}
//       <div className="my-6">
//         <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {business.data.businessImages?.length > 0 ? (
//             business.data.businessImages.map((image, index) => (
//               <div key={index} className="rounded-lg shadow-md">
//                 <img
//                   src={image}
//                   alt={`Business Image ${index + 1}`}
//                   className="w-full h-auto rounded-lg"
//                 />
//               </div>
//             ))
//           ) : (
//             <p>No images available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessDetails;
