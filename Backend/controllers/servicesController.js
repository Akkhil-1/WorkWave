const Service = require("../models/services");
const addService = async (req, res) => {
  try {
    const { name, description, price, businessId } = req.body;
    if (!name || !description || !price || !businessId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newService = new Service({
      name,
      description,
      price,
      business: businessId,
    });
    await newService.save();
    res
      .status(201)
      .json({ message: "Service added successfully", data: newService });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add service", error: error.message });
  }
};

const getService = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Backend: Received id:", id);
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ status: 404, msg: "Service not found" });
    }
    res.json({ status: 200, msg: "Service found", data: service });
  } catch (err) {
    console.error("Error fetching Service:", err);
    res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};

module.exports = { addService, getService };
