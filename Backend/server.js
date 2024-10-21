const express = require("express");
const app = express();
const port = 3001;
const dbConnect = require("../Backend/middlewares/db");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const businessRouter = require("./routes/businessRouter");
const bookingRouter = require("./routes/bookingRouter");
const otpRoute = require("./routes/otpRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

dbConnect();

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/business", businessRouter);
app.use("/booking", bookingRouter);
app.use("/otp", otpRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
