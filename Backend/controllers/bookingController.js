const mongoose = require("mongoose");
const Booking = require("../models/bookingDetails");
const User = require("../models/users");
const Business = require("../models/business");
const { sendBookingMail } = require("../helper/bookingMail");
const addBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      age,
      mobile_number,
      // serviveName,
      guest,
      bookingDate,
      bookingTime,
      // status,
      customerNotes,
    } = req.body;

    const userId = req.user._id;
    // const businessId = req.businessId;

    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({ msg: "User not found" });
    }
    const booking = await Booking.create({
      name,
      email,
      age,
      mobile_number,
      // serviveName,
      guest,
      bookingDate,
      bookingTime,
      // status,
      customerNotes,
    });
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          bookingDetails: {
            _id: booking._id,
          },
        },
      },
      { new: true }
    );
    // await Business.findByIdAndUpdate(
    //   businessId,
    //   { $push: { bookings: booking._id } },
    //   { new: true }
    // );
    await sendBookingMail(email, name, bookingDate, bookingTime, guest);
    res.json({
      msg: "Booking done successfully",
      data: booking,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "An error occurred while booking",
    });
  }
};

// Get all businesses with their bookings
const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find().populate('bookings'); // Populate bookings
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
}

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

module.exports = { addBooking, getBusinesses, updateBookingDetails, deleteBooking };
