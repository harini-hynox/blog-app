const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token; //  read from cookie
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(404).json({ msg: "User not found" });

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
