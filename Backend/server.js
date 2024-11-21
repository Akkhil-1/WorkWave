const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const dbConnect = require("../Backend/middlewares/db");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const businessRouter = require("./routes/businessRouter");
const bookingRouter = require("./routes/bookingRouter");
const serviceRouter = require("./routes/serviceRouter");
const otpRoute = require("./routes/otpRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

dbConnect();

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/business", businessRouter);
app.use("/booking", bookingRouter);
app.use("/services",serviceRouter);
app.use("/otp", otpRoute);


app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
