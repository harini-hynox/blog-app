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
    { expiresIn: "1h" } // short-lived
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // long-lived
  );

  return { accessToken, refreshToken };
};

// -------------------- SIGNUP --------------------
router.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    email = email.toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    res.setHeader("x-access-token", accessToken);

    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, username: user.username, email: user.email },
      accessToken,
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// -------------------- LOGIN --------------------
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const { accessToken, refreshToken } = generateTokens(user._id);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    res.setHeader("x-access-token", accessToken);

    res.json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
      accessToken,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// -------------------- REFRESH --------------------
router.post("/refresh", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const user = await User.findById(userId);
    if (!user || !user.refreshToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(user.refreshToken, process.env.JWT_REFRESH_SECRET, async (err) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });

      const { accessToken, refreshToken } = generateTokens(user._id);

      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      await user.save();

      res.setHeader("x-access-token", accessToken);

      res.json({
        message: "Token refreshed",
        accessToken,
      });
    });
  } catch (err) {
    console.error("❌ Refresh error:", err.message);
    res.status(403).json({ message: "Refresh failed" });
  }
});

// -------------------- LOGOUT --------------------
router.post("/logout", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Clear tokens in DB
    user.accessToken = null;
    user.refreshToken = null;
    await user.save();

    res.json({ message: "Logout successful" });
  } catch (err) {
    console.error("❌ Logout error:", err);
    res.status(500).json({ message: "Logout failed" });
  }
});

module.exports = router;
