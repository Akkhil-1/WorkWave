const Service = require("../models/services");
const Business = require("../models/business");
// const addService = async (req, res) => {
//   try {
//     const { name, description, price } = req.body;
//     if (!name || !description || !price) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const businessId = req.user._id;
//     const newService = new Service({
//       name,
//       description,
//       price,
//       business: businessId,
//     });
//     console.log(businessId);
    
//     await newService.save();
//     await Business.findByIdAndUpdate(
//       businessId,
//       { $push: { services: newService._id } },
//       { new: true } // Return the updated document
//     );
//     res
//       .status(201)
//       .json({ message: "Service added successfully", data: newService });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Failed to add service", error: error.message });
//   }
// };
const addService = async (req, res) => {
  try {
    const { name, description, price } = req.body;


    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminId = req.user._id; 
    if (!adminId) {
      return res.status(400).json({ message: "Admin ID not found" });
    }

   
    const business = await Business.findOne({ ownerDetails: adminId });
    if (!business) {
      return res.status(404).json({ message: "Business not found for this admin" });
    }

    const businessId = business._id; 

    const newService = new Service({
      name,
      description,
      price,
      business: businessId,
    });


    await newService.save();

   
    const updatedBusiness = await Business.findByIdAndUpdate(
      businessId,
      { $push: { services: newService._id } },
      { new: true } 
    );


    if (!updatedBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }

   
    res.status(201).json({
      message: "Service added successfully",
      data: newService,
      business: updatedBusiness, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add service",
      error: error.message,
    });
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
