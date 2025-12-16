import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { fetchBusinessDetails } from "./fetchBusinessDetails";
import { fetchServiceDetails } from "./fetchServiceData";
import axios from "axios";
import toast from "react-hot-toast";

const FinalBusinessDetails = () => {
  const { id } = useParams();

  const [business, setBusiness] = useState(null);
  const [service, setService] = useState([]); // ✅ array
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
      setLoading(true);
      setError(null);

      try {
        // 1️⃣ Business
        const businessData = await fetchBusinessDetails(id);

        if (!businessData) {
          setBusiness(null);
          setService([]);
          setReviews([]);
        } else {
          setBusiness(businessData);

          // 2️⃣ Services (SAFE)
          const servicesArray = Array.isArray(businessData.services)
            ? businessData.services
            : [];

          const serviceRes = await Promise.all(
            servicesArray.map(async (s) => await fetchServiceDetails(s))
          );

          setService(serviceRes.filter(Boolean));
        }

        // 3️⃣ Reviews (NEVER CRASH APP)
        try {
          const reviewsRes = await axios.get(
            `https://workwave-aage.onrender.com/reviews/get/${id}`
          );
          setReviews(Array.isArray(reviewsRes.data) ? reviewsRes.data : []);
        } catch (reviewErr) {
          if (reviewErr.response?.status === 404) {
            setReviews([]);
          } else {
            console.error("Review fetch failed:", reviewErr);
            setReviews([]);
          }
        }
      } catch (err) {
        console.error("Business fetch failed:", err);
        setError("Failed to load business details");
      } finally {
        setLoading(false);
      }
    };

    getBusinessDetails();
  }, [id]);

  /* ---------- Validation ---------- */
  const validateName = (name) => /^[a-zA-Z\s]{1,20}$/.test(name.trim());
  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  const validateReview = (review) => review.trim().length <= 50;

  /* ---------- Review Submit ---------- */
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(newReview.name)) {
      toast.error("Name must be letters only (max 20 chars)");
      return;
    }
    if (!validateEmail(newReview.email)) {
      toast.error("Invalid email");
      return;
    }
    if (!validateReview(newReview.review)) {
      toast.error("Review must be under 50 characters");
      return;
    }

    try {
      const res = await axios.post(
        `https://workwave-aage.onrender.com/reviews/add/${id}`,
        newReview
      );
      setReviews((prev) => [...prev, res.data.review]);
      setNewReview({ name: "", email: "", review: "" });
      toast.success("Review submitted!");
    } catch (err) {
      toast.error("Failed to submit review");
      console.error(err);
    }
  };

  /* ---------- Guards ---------- */
  if (loading) return <p>Loading business details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!business) return <p>No business details available</p>;

  /* ---------- JSX ---------- */
  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* Business Details */}
      {/* (UNCHANGED JSX BELOW – YOUR UI IS GOOD) */}

      {/* Services */}
      {activeTab === "services" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.length > 0 ? (
            service.map((s) => (
              <div key={s._id} className="shadow p-4 rounded">
                <h4>{s.name}</h4>
                <p>{s.description}</p>
                <p>₹{s.price}</p>
                <NavLink to={`/business/service/bookingform/${id}/${s._id}`}>
                  <button>Book Now</button>
                </NavLink>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center">No services available</p>
          )}
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div>
          {reviews.length > 0 ? (
            reviews.map((r) => <p key={r._id}>{r.review}</p>)
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FinalBusinessDetails;
