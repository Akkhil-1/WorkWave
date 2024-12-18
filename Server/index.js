const express = require("express");
const app = express();
const PORT = 3001;
const dbConnect = require("./middlewares/db");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const businessRouter = require("./routes/businessRouter");
const bookingRouter = require("./routes/bookingRouter");
const reviewRouter = require("./routes/reviewsRouter");
const serviceRouter = require("./routes/serviceRouter");
const otpRoute = require("./routes/otpRoute");
const userDashboard = require("./routes/userDashboard");
const Booking = require('./models/bookingDetails')
const Razorpay = require("razorpay");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
require("dotenv").config();
app.use(express.json());
const corsOptions = {
  origin: "https://work-wave-five.vercel.app",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
dbConnect();

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/business", businessRouter);
app.use("/booking", bookingRouter);
app.use("/reviews", reviewRouter);
app.use("/services", serviceRouter);
app.use("/otp", otpRoute);
app.use("/usdashboard", userDashboard);
app.post("/orders", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "receipt#1",
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);

    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
app.put('/usdashboard/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { paymentId, status, paymentStatus } = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    booking.paymentStatus = paymentStatus;
    booking.status = status;
    booking.paymentId = paymentId;

    await booking.save();

    return res.status(200).json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.listen(3001, () => {
  console.log(`Running on port 3001`);
});

app.get("/", (req, res) => {
  res.send("Hello from workwave backend!");
});
