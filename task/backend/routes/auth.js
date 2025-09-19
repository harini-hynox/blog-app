const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// 🔹 Helper to generate tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

// -------------------- SIGNUP --------------------
router.post("/signup", async (req, res) => {
  try {
    console.log("📩 Signup request:", req.body);

    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Normalize email
    email = email.toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id);

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    res.setHeader("x-access-token", accessToken);
    res.setHeader("x-refresh-token", refreshToken);

    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, username: user.username, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// -------------------- LOGIN --------------------
router.post("/login", async (req, res) => {
  try {
    console.log("📩 Login request body:", req.body);

    let { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    email = email.toLowerCase();

    const user = await User.findOne({ email });
    console.log("🔎 Found user:", user ? user.email : "❌ not found");

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password match:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const { accessToken, refreshToken } = generateTokens(user._id);

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    res.setHeader("x-access-token", accessToken);
    res.setHeader("x-refresh-token", refreshToken);

    res.json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// -------------------- REFRESH --------------------
router.post("/refresh", async (req, res) => {
  try {
    const tokenFromHeader = req.headers["x-refresh-token"];
    const { refreshToken } = req.body;

    const token = tokenFromHeader || refreshToken;
    if (!token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const user = await User.findOne({ refreshToken: token });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });

      const { accessToken, refreshToken: newRefreshToken } = generateTokens(
        decoded.id
      );

      // 🔹 Update tokens in DB
      user.accessToken = accessToken;
      user.refreshToken = newRefreshToken;
      await user.save();

      // ✅ Send new tokens in both headers + body
      res.setHeader("x-access-token", accessToken);
      res.setHeader("x-refresh-token", newRefreshToken);

      res.json({
        message: "Token refreshed",
        accessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (err) {
    console.error("❌ Refresh error:", err.message);
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

module.exports = router;
