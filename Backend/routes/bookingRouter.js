const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const bookingValidate = require("../middlewares/bookingValidate");
const bookingDetailsAuth = require("../middlewares/bookingDetailsAuth");

// const extractBusinessId = (req, res, next) => {
//   req.businessId = req.params.businessId;
//   next();
// };

router.post(
  // '/business/:businessId/addbooking',
  "/business/addbooking",
  bookingValidate,
  bookingDetailsAuth,
  // extractBusinessId,
  bookingController.addBooking
);
router.get("/getBooking", bookingController.getBusinesses);

// Update booking with booking ID in the URL
router.post("/update-booking/:id", bookingController.updateBookingDetails);
router.post("/delete-booking/:id", bookingController.deleteBooking);

module.exports = router;
