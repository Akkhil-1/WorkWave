// bookingController.js
const mongoose = require("mongoose");
const Booking = require("../models/bookingDetails");
const User = require("../models/users");
const Business = require("../models/business");
const Services = require("../models/services");
const { sendBookingMail } = require("../helper/bookingMail");

const addBooking = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const {
      name,
      email,
      dateOfBirth,
      mobileNumber,
      guestCount,
      bookingDate,
      bookingTime,
      customerNotes,
      serviceId,
    } = req.body;

    const userId = req.user._id;
    const businessId = req.params.businessId;

    console.log("User ID:", userId);
    console.log("Business ID:", businessId);
    console.log("Service ID:", serviceId);

    // Validate user
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if business exists
    const businessDetails = await Business.findById(businessId);
    if (!businessDetails) {
      return res.status(404).json({ msg: "Business not found" });
    }

    // Check if service exists (optional but recommended)
    if (serviceId) {
      const serviceDetails = await Services.findById(serviceId);
      if (!serviceDetails) {
        return res.status(404).json({ msg: "Service not found" });
      }
    }
    const booking = await Booking.create({
      name,
      email,
      dateOfBirth,
      mobileNumber,
      guestCount,
      bookingDate,
      bookingTime,
      customerNotes,
      business: businessId,
      service: serviceId || null,
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { bookingDetails: booking._id },
      },
      { new: true }
    );
    await Business.findByIdAndUpdate(
      businessId,
      {
        $push: { bookings: booking._id },
      },
      { new: true }
    );
    console.log("Created Booking:", booking);

    res.status(201).json({
      msg: "Booking done successfully",
      data: booking,
    });
  } catch (err) {
    console.error("Booking Creation Error:", err);
    res.status(500).json({
      msg: "An error occurred while booking",
      error: err.message,
    });
  }
};

// Get all businesses with their bookings
const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find().populate("bookings"); // Populate bookings
    res.json({
      status: 200,
      msg: "Businesses exist",
      data: businesses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "An error occurred while fetching businesses",
    });
  }
};

// Update booking details
const updateBookingDetails = async (req, res) => {
  try {
    const id = req.params.id; // Changed from _id to id
    const update = req.body;

    const schemaFields = Object.keys(Booking.schema.paths);

    for (const key in update) {
      if (!schemaFields.includes(key)) {
        return res.status(400).json({
          status: 400,
          msg: `Unknown field: ${key}`,
        });
      }
      if (!update[key] || update[key].trim() === "") {
        return res.status(400).json({
          status: 400,
          msg: `Field ${key} is missing or empty`,
        });
      }
    }
    const updateData = await Booking.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: 200,
      msg: "Booking updated",
      data: updateData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "An error occurred while updating the booking",
    });
  }
};

// Delete booking
const deleteBooking = async (req, res) => {
  try {
    const id = req.params.id; // Changed from _id to id
    const deleteData = await Booking.findByIdAndDelete(id);
    if (deleteData) {
      res.json({
        status: 200,
        msg: "Booking deleted successfully",
        data: deleteData,
      });
    } else {
      res.status(404).json({
        msg: "Booking not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "An error occurred while deleting the booking",
    });
  }
};

const getBooking = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(401).json({ msg: "Unauthorized - User ID not found" });
  }
  try {
    const user = await User.findById(userId).populate({
      path: "bookingDetails",
      populate: [
        {
          path: "business",
          model: "Business", // Ensure this matches exactly
          select: "businessName",
        },
        {
          path: "service",
          model: "Services", // Ensure this matches exactly
          select: "name",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Detailed debugging logs
    console.log("Bookings Length:", user.bookingDetails.length);

    user.bookingDetails.forEach((booking, index) => {
      console.log(`Booking ${index}:`);
      console.log("Booking ID:", booking._id);
      console.log("Business:", booking.business);
      console.log("Service:", booking.service);
    });

    return res.status(200).json({
      bookings: user.bookingDetails,
    });
  } catch (err) {
    console.error("Detailed Error:", err);
    return res.status(500).json({
      msg: "Server error",
      error: err.message,
      stack: err.stack,
    });
  }
};

module.exports = {
  addBooking,
  getBusinesses,
  getBooking,
  updateBookingDetails,
  deleteBooking,
};
