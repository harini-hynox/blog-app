const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET; // get from .env

function auth(req, res, next) {
  // token can come from x-auth-token header or Authorization: Bearer <token>
  let token =
    req.header("x-auth-token") || req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // verify token
    req.user = decoded; // attach user data (id) to req
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(401).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
