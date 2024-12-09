const express = require("express");
const app = express();
const PORT = process.env.PORT;
const dbConnect = require("./middlewares/db")
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const businessRouter = require("./routes/businessRouter");
const bookingRouter = require("./routes/bookingRouter");
const reviewRouter = require("./routes/reviewsRouter");
const serviceRouter = require("./routes/serviceRouter");
const otpRoute = require("./routes/otpRoute");
const userDashboard  = require('./routes/userDashboard')
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
require("dotenv").config();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,               
};
app.use(cors(corsOptions));
dbConnect();

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/business", businessRouter);
app.use("/booking", bookingRouter);
app.use("/reviews",reviewRouter)
app.use("/services",serviceRouter);
app.use("/otp", otpRoute);
app.use('/usdashboard', userDashboard);


app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

app.get("/", (req,res) => {
  res.send("Hello from workwave backend!")
})
