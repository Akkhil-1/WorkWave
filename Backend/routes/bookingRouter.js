// bookingRoutes.js (Router)
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const bookingValidate = require("../middlewares/bookingValidate");
const bookingDetailsAuth = require("../middlewares/bookingDetailsAuth");
const userauthMiddleware = require("../middlewares/UserAuthMiddleware");

const extractBusinessId = (req, res, next) => {
  req.businessId = req.params.businessId;
   // Assuming you're passing the businessId in the URL
  console.log(req.businessId);
  
  next();
};
router.post(
  "/addbooking/:businessId",
  userauthMiddleware,
  bookingValidate, 
  bookingDetailsAuth,
  extractBusinessId,
  bookingController.addBooking
)
module.exports = router;

router.get("/getBooking", bookingController.getBusinesses);
router.post("/update-booking/:id", bookingController.updateBookingDetails);
router.post("/delete-booking/:id", bookingController.deleteBooking);
// router.get("/getBookingOfBusiness", bookingController.getBookingsByBusiness);


module.exports = router;
