const mongoose = require("mongoose");
const bookingschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
      default: 1,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    bookingTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default:"Pending"
    },
    customerNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const bookingDetails = mongoose.model("bookingDetails", bookingschema);

module.exports = bookingDetails;
