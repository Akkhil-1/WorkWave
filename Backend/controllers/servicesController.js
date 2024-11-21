const Services = require("../models/services");
const Business = require("../models/business");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const addService = async (req, res) => {
    try {
        const { serviceName, description, price } = req.body;

        if (!serviceName || !description || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminId = decoded._id;

        const admin = await Admin.findById(adminId).populate("adminBusinesses");
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const businessId = admin.adminBusinesses[0];
        if (!businessId) {
            return res.status(404).json({ message: "No business found for this admin" });
        }

        const newService = new Services({ serviceName, description, price });
        const savedService = await newService.save();

        const business = await Business.findById(businessId);
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        business.services.push(savedService._id);
        await business.save();

        res.status(201).json({
            message: "Service added successfully",
            service: savedService,
            business,
        });
    } catch (error) {
        console.error(error);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = { addService };
