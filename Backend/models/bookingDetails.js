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
    age: {
      type: Number,
      required: true,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    // serviceName :{
    //   type : String,
    //   required : true
    // },
    guest: {
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
    // status: {
    //   type: String,
    //   enum: ["Confirmed", "Cancelled", "Completed", "Pending"],
    // },
    customerNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const bookingDetails = mongoose.model("bookingDetails", bookingschema);

module.exports = bookingDetails;
