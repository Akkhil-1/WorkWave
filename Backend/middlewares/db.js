const mongoose = require("mongoose");

const url = process.env.DB_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Db connected");
  } catch (err) {
    console.log("Error is " + err);
    res.json({
      msg: "Db not connected",
    });
  }
};

module.exports = dbConnect;
