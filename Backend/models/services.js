const mongoose = require("mongoose");
const servicesSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
const Services = mongoose.model("Services", servicesSchema);
module.exports = Services;
