const mongoose = require("mongoose");
const Booking = require("../models/bookingDetails");
const User = require("../models/users");
const Business = require("../models/business");
const Admin = require("../models/admin")
const Services = require("../models/services");
const { sendBookingMail } = require("../helper/bookingMail");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const updateBookingStatus = async (req, res) => {
  const { bookingId , status , serviceId } = req.body;

  // Validate the status input
  const validStatuses = ["pending", "confirmed", "Cancel"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    // Find the booking by ID and update the status
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    // If booking not found
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking status updated", booking });
  } catch (err) {
    console.error("Error updating status:", err);
    res
      .status(500)
      .json({ message: "Failed to update status", error: err.message });
  }
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amber1251.be22@chitkara.edu.in", // Replace with your email
    pass: "dhamaamber@5678", // Replace with your email password
  },
});

const addBooking = async (req, res) => {
  try {
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

    const userId = req.user._id; // Assuming you're using some authentication middleware
    const businessId = req.params.businessId;

    // Validate user existence
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Validate business existence
    const businessDetails = await Business.findById(businessId).populate(
      "ownerDetails",
      "email"
    );
    if (!businessDetails) {
      return res.status(404).json({ msg: "Business not found" });
    }

    // Validate service existence (if provided)
    let serviceDetails;
    if (serviceId) {
      serviceDetails = await Services.findById(serviceId);
      if (!serviceDetails) {
        return res.status(404).json({ msg: "Service not found" });
      }
    }

    // Create the booking
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

    // Update references in User and Business
    await User.findByIdAndUpdate(
      userId,
      { $push: { bookingDetails: booking._id } },
      { new: true }
    );

    await Business.findByIdAndUpdate(
      businessId,
      { $push: { bookings: booking._id } },
      { new: true }
    );

    // Send email to the business owner about the new booking
    const ownerEmail = businessDetails.ownerDetails.email;
    const mailOptions = {
      from: "amber1251.be22@chitkara.edu.in",
      to: ownerEmail,
      subject: "New Booking Received!",
      html: `
<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
  <div style="background-color: #007bff; color: white; padding: 15px; text-align: center;">
    <h2 style="margin: 0; font-size: 24px;">New Booking Alert!</h2>
  </div>
  <div style="padding: 20px; background-color: #f9f9f9;">
    <p style="font-size: 16px; line-height: 1.5;">Hello,</p>
    <p style="font-size: 16px; line-height: 1.5;">
      You have received a new booking for your business: <strong>${
        businessDetails.businessName
      }</strong>.
    </p>
    <div style="margin: 20px 0; padding: 15px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px;">
      <h3 style="margin-top: 0; font-size: 20px; border-bottom: 2px solid #007bff; padding-bottom: 5px;">Booking Details</h3>
      <ul style="list-style: none; padding: 0; margin: 0; font-size: 16px; line-height: 1.8;">
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Mobile Number:</strong> ${mobileNumber}</li>
        <li><strong>Guest Count:</strong> ${guestCount}</li>
        <li><strong>Booking Date:</strong> ${bookingDate}</li>
        <li><strong>Booking Time:</strong> ${bookingTime}</li>
        ${
          serviceDetails
            ? `<li><strong>Service:</strong> ${serviceDetails.name}</li>`
            : ""
        }
        <li><strong>Notes:</strong> ${customerNotes}</li>
      </ul>
    </div>
    <p style="font-size: 16px; line-height: 1.5;">
      Please visit your dashboard for more details about this booking.
    </p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://your-business-dashboard-link.com" 
         style="background-color: #007bff; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Go to Dashboard</a>
    </div>
  </div>
  <div style="background-color: #007bff; color: white; padding: 10px; text-align: center; font-size: 14px;">
    <p style="margin: 0;">Thank you for using our services!</p>
  </div>
</div>
`,
    };

    await transporter.sendMail(mailOptions);

    // Response to the user
    res.status(201).json({
      msg: "Booking created successfully!",
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
          select: "name price",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
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
const getEarningsForLast10Days = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("token: ", token);

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminId = decoded._id;
    console.log("Admin ID from JWT:", adminId);

    // Fetch the admin and their single business
    const admin = await Admin.findById(adminId).populate(
      "adminBusinesses",
      "_id"
    );
    if (!admin || admin.adminBusinesses.length === 0) {
      return res
        .status(404)
        .json({ message: "No businesses found for this admin" });
    }

    const businessId = admin.adminBusinesses[0]._id;
    console.log("Business ID:", businessId);

    // Calculate last 10 days
    const last10Days = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      last10Days.push(date.toISOString().split("T")[0]);
    }

    // Initialize earnings data
    const earningsByDate = {};
    for (const date of last10Days) {
      earningsByDate[date] = 0;
    }

    // Fetch bookings for the last 10 days for the single business
    const bookings = await Booking.find({
      business: businessId,
      bookingDate: { $in: last10Days },
      // paymentStatus: "Paid",
    }).populate("service", "price");

    // Calculate earnings for each date
    bookings.forEach((booking) => {
      const date = booking.bookingDate; // Format: "YYYY-MM-DD"
      const servicePrice = booking.service?.price || 0;
      earningsByDate[date] += servicePrice;
    });

    // Send response
    res.status(200).json({
      success: true,
      data: last10Days.map((date) => ({
        date,
        earnings: earningsByDate[date],
      })),
    });
  } catch (error) {
    console.error("Error fetching earnings:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const updatePaymentStatus = async (req, res) => {
  const { paymentId, bookingId, paymentStatus } = req.body;
  const validStatuses = ["paid", "not paid", "Paid", "Not Paid"];
  
  if (!validStatuses.includes(paymentStatus)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { paymentStatus: paymentStatus, paymentId: paymentId },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    res.status(200).json({ message: "Payment status updated", booking });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
};


module.exports = {
  addBooking,
  getBusinesses,
  getBooking,
  updateBookingDetails,
  deleteBooking,
  updateBookingStatus,
  getEarningsForLast10Days,
  updatePaymentStatus
};
