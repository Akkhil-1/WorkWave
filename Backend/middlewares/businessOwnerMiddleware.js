const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const { JWT_SECRET } = require("../config");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    console.log("hi");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded._id);
    if (!admin) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    req.user = admin;
    next();
  } catch (err) {
    console.log("Auth error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
