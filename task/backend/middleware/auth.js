const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Ensure token matches DB (prevent logout bypass)
    const user = await User.findById(decoded.id);
    if (!user || user.accessToken !== token)
      return res.status(401).json({ message: "Invalid or expired token" });

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is invalid or expired" });
  }
};

module.exports = auth;
