// import React, { useEffect, useState } from "react";
// import { useParams, NavLink } from "react-router-dom";
// import { fetchBusinessDetails } from "./fetchBusinessDetails";
// import { fetchServiceDetails } from "./fetchServiceData";

// const FinalBusinessDetails = () => {
//   const { id } = useParams();
//   const [business, setBusiness] = useState(null);
//   const [service, setService] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getBusinessDetails = async () => {
//       try {
//         const businessRes = await fetchBusinessDetails(id); // Make sure this function fetches data from the backend API
//         setBusiness(businessRes.data); // Store the response
//         console.log(businessRes);
//         const serviceRes = await Promise.all(
//           businessRes.data.services.map(async (s) => {
//             const tempRes = await fetchServiceDetails(s);
//             return tempRes.data;
//           })
//         );

//         setService(serviceRes);
//         console.log(serviceRes);
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
//             src={
//               business.businessLogo ||
//               "https://via.placeholder.com/150?text=No+Logo"
//             }
//             alt={business.businessName}
//             className="w-full h-auto rounded-lg"
//           />
//         </div>

//         {/* Business Details */}
//         <div className="md:w-2/3 p-4">
//           <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//             {/* Business Name */}
//             <h1 className="text-4xl font-extrabold text-[#591B5F] mb-4">
//               {business.businessName}
//             </h1>

//             {/* Address Section */}
//             <div className="flex items-start mb-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-[#591B5F] mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0-7c4.97 0 9 4.03 9 9 0 2.92-1.56 5.4-3.88 7.09L12 21l-5.12-3.91C4.56 17.4 3 14.92 3 12c0-4.97 4.03-9 9-9z"
//                 />
//               </svg>
//               <p className="text-lg text-gray-700">
//                 {business.address}, {business.city}, {business.state},{" "}
//                 {business.pincode}
//               </p>
//             </div>

//             {/* Opening Hours */}
//             <div className="flex items-center mb-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-[#591B5F] mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8v4l3 3m6-9a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               <p className="text-lg text-gray-700">
//                 <span className="font-semibold">Opening Hours:</span>{" "}
//                 {business.openingTime} - {business.closingTime}
//               </p>
//             </div>

//             {/* Off Days */}
//             <div className="flex items-center mb-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-[#591B5F] mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 8h18M9 3h6m-7 18h8M3 12h18m-9-9v18"
//                 />
//               </svg>
//               <p className="text-lg text-gray-700">
//                 <span className="font-semibold">Off Days:</span>{" "}
//                 {business.offDays || "None"}
//               </p>
//             </div>

//             {/* Contact Details */}
//             <div className="flex items-center mb-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-[#591B5F] mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 8h18M9 3h6m-7 18h8M3 12h18m-9-9v18"
//                 />
//               </svg>
//               <p className="text-lg text-gray-700">
//                 <span className="font-semibold">Contact:</span>{" "}
//                 {business.contactPhone} | {business.contactEmail}
//               </p>
//             </div>
//           </div>

//           {/* Services */}
//           <div className="mt-6">
//             <h2 className="text-2xl font-semibold mb-4">Services</h2>
//             {service?.length > 0 ? (
//               service.map((service) => (
//                 <div
//                   key={service._id}
//                   className="border p-4 mb-4 rounded-lg shadow-md bg-gray-50 text-gray-700"
//                 >
//                   <h3 className="text-xl font-semibold">{service.name}</h3>
//                   <p className="mb-2">
//                     Description:{" "}
//                     {service.description || "No description provided"}
//                   </p>
//                   <p className="mb-2 font-bold">Price: ₹{service.price}</p>
//                   <NavLink
//                     to={`/business/service/bookingform/${id}/${service._id}`}
//                   >
//                     <button className="mt-2 bg-[#591B5F] text-white py-2 px-4 rounded">
//                       Book Now
//                     </button>
//                   </NavLink>
//                 </div>
//               ))
//             ) : (
//               <p>No services available.</p>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* Business Images Section */}
//       <div className="my-10">
//         {/* Section Heading */}
//         <div className="text-center mb-8">
//           <h2 className="text-4xl font-extrabold text-[#591B5F]">Gallery</h2>
//           <p className="text-gray-600 mt-2 text-lg">
//             Explore the ambiance and services we offer through our gallery.
//           </p>
//         </div>

//         {/* Images Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {business.businessImages?.length > 0 ? (
//             business.businessImages.map((image, index) => (
//               <div
//                 key={index}
//                 className="relative group overflow-hidden rounded-lg shadow-lg"
//               >
//                 <img
//                   src={image}
//                   alt={`Business Image ${index + 1}`}
//                   className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
//                 />
//                 {/* Optional overlay for hover effect */}
//                 <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center col-span-full text-gray-600">
//               No images available.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinalBusinessDetails;
// import React, { useEffect, useState } from "react";
// import { useParams, NavLink } from "react-router-dom";
// import { fetchBusinessDetails } from "./fetchBusinessDetails";
// import { fetchServiceDetails } from "./fetchServiceData";
// import axios from "axios";

// const FinalBusinessDetails = () => {
//   const { id } = useParams();
//   const [business, setBusiness] = useState(null);
//   const [service, setService] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState({ name: "", email: "", review: "" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getBusinessDetails = async () => {
//       try {
//         console.log(id);

//         const businessRes = await fetchBusinessDetails(id);
//         setBusiness(businessRes.data);
//         const serviceRes = await Promise.all(
//           businessRes.data.services.map(async (s) => {
//             const tempRes = await fetchServiceDetails(s);
//             return tempRes.data;
//           })
//         );
//         setService(serviceRes);

//         // Fetch reviews
//         const reviewsRes = await axios.get(`http://localhost:3001/reviews/get/${id}`);

//         setReviews(reviewsRes.data);
//       } catch (err) {
//         setError("Failed to fetch business reviews");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getBusinessDetails();
//   }, [id]);

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`/reviews/add/${id}`, newReview);
//       setReviews((prev) => [...prev, response.data.review]); // Append new review
//       setNewReview({ name: "", email: "", review: "" }); // Reset form
//     } catch (error) {
//       console.error("Error adding review:", error);
//     }
//   };

//   if (loading) return <p>Loading business details...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!business) return <p>No business details available</p>;

//   return (
//     <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
//       {/* Existing Business Details Code */}
//       {/* Services, Images, and Reviews Section */}
//       <div className="mt-6">
//         <h2 className="text-3xl font-bold text-center text-[#591B5F]">Explore Our Offerings</h2>

//         {/* Services Slider */}
//         <div className="mt-8">
//           <h3 className="text-2xl font-semibold mb-4">Our Services</h3>
//           <div className="flex overflow-x-auto space-x-4 pb-4">
//             {service?.length > 0 ? (
//               service.map((s) => (
//                 <div
//                   key={s._id}
//                   className="w-72 flex-shrink-0 bg-gray-50 shadow-md p-4 rounded-lg"
//                 >
//                   <h4 className="text-xl font-semibold">{s.name}</h4>
//                   <p className="text-sm text-gray-600">{s.description}</p>
//                   <p className="font-bold mt-2">Price: ₹{s.price}</p>
//                   <NavLink to={`/business/service/bookingform/${id}/${s._id}`}>
//                     <button className="mt-4 bg-[#591B5F] text-white py-2 px-4 rounded">
//                       Book Now
//                     </button>
//                   </NavLink>
//                 </div>
//               ))
//             ) : (
//               <p>No services available</p>
//             )}
//           </div>
//         </div>

//         {/* Reviews Section */}
//         <div className="mt-12">
//           <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
//           {/* Add Review Form */}
//           <form
//             onSubmit={handleReviewSubmit}
//             className="bg-gray-50 p-4 shadow-md rounded-lg"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 value={newReview.name}
//                 onChange={(e) =>
//                   setNewReview({ ...newReview, name: e.target.value })
//                 }
//                 required
//                 className="p-2 border rounded"
//               />
//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 value={newReview.email}
//                 onChange={(e) =>
//                   setNewReview({ ...newReview, email: e.target.value })
//                 }
//                 required
//                 className="p-2 border rounded"
//               />
//             </div>
//             <textarea
//               placeholder="Your Review"
//               value={newReview.review}
//               onChange={(e) =>
//                 setNewReview({ ...newReview, review: e.target.value })
//               }
//               required
//               className="p-2 border rounded w-full mt-4"
//             ></textarea>
//             <button
//               type="submit"
//               className="mt-4 bg-[#591B5F] text-white py-2 px-4 rounded"
//             >
//               Submit Review
//             </button>
//           </form>

//           {/* Display Reviews */}
//           <div className="mt-8">
//             {reviews?.length > 0 ? (
//               reviews.map((r) => (
//                 <div
//                   key={r._id}
//                   className="bg-white shadow p-4 rounded-lg mb-4"
//                 >
//                   <h4 className="text-lg font-semibold">{r.name}</h4>
//                   <p className="text-sm text-gray-600">{r.email}</p>
//                   <p className="mt-2">{r.review}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-600">No reviews yet. Be the first!</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinalBusinessDetails;
import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { fetchBusinessDetails } from "./fetchBusinessDetails";
import { fetchServiceDetails } from "./fetchServiceData";
import axios from "axios";

const FinalBusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    review: "",
  });
  const [activeTab, setActiveTab] = useState("services");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBusinessDetails = async () => {
      try {
        const businessRes = await fetchBusinessDetails(id);
        setBusiness(businessRes.data);

        const serviceRes = await Promise.all(
          businessRes.data.services.map(async (s) => {
            const tempRes = await fetchServiceDetails(s);
            return tempRes.data;
          })
        );
        setService(serviceRes);

        // Fetch reviews
        const reviewsRes = await axios.get(
          `http://localhost:3001/reviews/get/${id}`
        );
        setReviews(reviewsRes.data);
      } catch (err) {
        setError("Failed to fetch business reviews");
      } finally {
        setLoading(false);
      }
    };

    getBusinessDetails();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/reviews/add/${id}`,
        newReview
      );
      setReviews((prev) => [...prev, response.data.review]);
      setNewReview({ name: "", email: "", review: "" });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (loading) return <p>Loading business details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!business) return <p>No business details available</p>;

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* Business Details Section */}
      <div className="flex flex-col md:flex-row mb-8">
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
        <div className="md:w-2/3 p-4">
          <h1 className="text-4xl font-extrabold text-[#591B5F] mb-4">
            {business.businessName}
          </h1>
          <p className="text-lg text-gray-700">
            {business.address}, {business.city}, {business.state},{" "}
            {business.pincode}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Opening Hours:</span>{" "}
            {business.openingTime} - {business.closingTime}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Off Days:</span>{" "}
            {business.offDays || "None"}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Contact:</span>{" "}
            {business.contactPhone} | {business.contactEmail}
          </p>
        </div>
      </div>

      {/* Tabs for Services, Images, and Reviews */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("services")}
          className={`py-2 px-4 rounded ${
            activeTab === "services" ? "bg-[#591B5F] text-white" : "bg-gray-200"
          }`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={`py-2 px-4 rounded ${
            activeTab === "images" ? "bg-[#591B5F] text-white" : "bg-gray-200"
          }`}
        >
          Business Images
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`py-2 px-4 rounded ${
            activeTab === "reviews" ? "bg-[#591B5F] text-white" : "bg-gray-200"
          }`}
        >
          Reviews
        </button>
      </div>

      {/* Services Section */}
      {activeTab === "services" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {service?.length > 0 ? (
            service.map((s) => (
              <div
                key={s._id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all duration-300"
              >
                <h4 className="text-2xl font-semibold text-[#591B5F] mb-4">
                  {s.name}
                </h4>
                <p className="text-sm text-gray-600 mb-4">{s.description}</p>
                <p className="font-bold text-lg text-[#591B5F] mb-6">
                  Price: ₹{s.price}
                </p>
                <NavLink to={`/business/service/bookingform/${id}/${s._id}`}>
                  <button className="mt-4 bg-[#591B5F] hover:bg-[#732073] text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Book Now
                  </button>
                </NavLink>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No services available
            </p>
          )}
        </div>
      )}

      {/* Business Images Section */}
      {activeTab === "images" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {business.businessImages?.length > 0 ? (
            business.businessImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Business Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      )}

      {/* Reviews Section */}
      {activeTab === "reviews" && (
        <div className="p-6 bg-gray-100 rounded-lg">
          {/* Review Form */}
          <form
            onSubmit={handleReviewSubmit}
            className="bg-white p-6 shadow-lg rounded-lg mb-8"
          >
            <h3 className="text-2xl font-semibold text-[#591B5F] mb-6 text-center">
              Share Your Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
                required
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#591B5F] shadow-sm"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={newReview.email}
                onChange={(e) =>
                  setNewReview({ ...newReview, email: e.target.value })
                }
                required
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#591B5F] shadow-sm"
              />
            </div>
            <textarea
              placeholder="Write your review here..."
              value={newReview.review}
              onChange={(e) =>
                setNewReview({ ...newReview, review: e.target.value })
              }
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#591B5F] shadow-sm w-full mt-6"
              rows="5"
            ></textarea>
            <button
              type="submit"
              className="mt-6 w-full bg-[#591B5F] hover:bg-[#732073] text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300"
            >
              Submit Review
            </button>
          </form>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews?.length > 0 ? (
              reviews.map((r) => (
                <div
                  key={r._id}
                  className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-[#591B5F] text-white font-semibold w-12 h-12 flex items-center justify-center rounded-full">
                      {r.name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{r.name}</h4>
                      <p className="text-sm text-gray-500">{r.email}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                    {r.review}
                  </p>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No reviews yet. Be the first!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalBusinessDetails;
