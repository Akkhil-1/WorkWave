const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { JWT_SECRET } = require("../config");
const userauthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    console.log("hi");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("Auth error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
}
module.exports = userauthMiddleware;
