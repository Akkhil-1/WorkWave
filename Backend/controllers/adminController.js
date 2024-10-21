const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const { sendGreetMail2 } = require("../helper/mairServices2");
const mongoose = require("mongoose");
const register = async (req, res) => {
  try {
    const { name, email, mobile_number, password, gender, address } = req.body;
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { mobile_number }],
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return res.status(400).json({
        msg: "Admin already exists with this email or mobile number",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const admin = await Admin.create({
      name,
      email,
      mobile_number,
      password: hashedPassword,
      gender,
      address,
    });
    // let token;
    // try {
    //   token = jwt.sign({ email: admin.email, _id: admin._id }, JWT_SECRET, {
    //     expiresIn: "1h",
    //   });
    //   console.log("Generated token:", token);
    // } catch (error) {
    //   console.error("Error generating token:", error);
    //   return res.status(500).json({
    //     msg: "Failed to generate token",
    //   });
    // }
    // res.cookie("token", token, {
    //   httpOnly: false,
    //   maxAge: 60 * 60 * 1000, // 1 hour
    //   sameSite: "none",
    // });

    if (email && name) {
      try {
        await sendGreetMail2(email, name);
        console.log("Greeting email sent!");
      } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Failed to send greeting email");
      }
    }
    console.log("Admin created:", admin);
    return res.status(201).json({
      msg: "Admin created successfully",
    });
  } catch (err) {
    console.error("Error in register function:", err);
    return res.status(500).json({
      msg: "Please check the details you have entered or try again later",
    });
  }
};

const login = async (req, res) => {
  try {
    console.log("Received login request:", req.body);

    const { email, password } = req.body;
    for (const key in req.body) {
      if (!req.body[key] || req.body[key].trim() === "") {
        console.log(`Field ${key} is missing or empty`);
        return res.status(400).json({
          status: 400,
          msg: `Field ${key} is missing or empty`,
        });
      }
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found with the provided email");
      return res.status(401).json({ msg: "Incorrect credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ msg: "Incorrect credentials" });
    }

    // Generate JWT token if authentication is successful
    const token = jwt.sign({ email: admin.email, _id: admin._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: false,
      maxAge: 60 * 60 * 1000,
      sameSite: "none",
    });

    console.log("Login successful, returning token");
    return res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ msg: "An error occurred during login" });
  }
};
const updateAdmin = async (req, res) => {
  try {
    const id = req.params._id;
    const update = req.body;
    // Get the schema paths (field names)
    const schemaFields = Object.keys(Admin.schema.paths);

    // Check for any unknown fields
    for (const key in update) {
      if (!schemaFields.includes(key)) {
        return res.status(400).json({
          status: 400,
          msg: `Unknown field: ${key}`,
        });
      }
      if (!update[key] || update[key].trim() === "") {
        return res.status(400).json({
          status: 400,
          msg: `Field ${key} is missing or empty`,
        });
      }
    }

    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }
    const updateData = await Admin.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updateData) {
      return res.status(404).json({
        status: 404,
        msg: "Admin not found",
      });
    }

    res.json({
      status: 200,
      msg: "Admin updated successfully",
      updateData,
    });
  } catch (error) {
    console.error("Error updating Admin:", error);
    res.status(500).json({
      status: 500,
      msg: "An error occurred while updating the Admin",
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params._id;
    const deleteData = await Admin.findByIdAndDelete(id);
    if (deleteData) {
      res.json({
        status: 200,
        msg: "Admin deleted successfully",
        data: deleteData,
      });
    } else {
      res.json({
        status: 404,
        msg: "Admin not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  register,
  login,
  updateAdmin,
  deleteAdmin,
};
