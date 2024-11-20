const jwt = require("jsonwebtoken");
const User = require("../models/users");

const userLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    // if (user.role !== 'user') {
    //   return res.status(403).json({ msg: "You do not have permission to access this resource" });
    // }
    req.user = user;
    next();
  } catch (err) {
    console.log("Auth error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = userLogin;
