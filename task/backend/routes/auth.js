const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ------------------ Signup ------------------
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "User registered successfully ✅" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ msg: "Server error during signup" });
  }
});

// ------------------ Login ------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // ✅ Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // ✅ Store JWT in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only https in production
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1h
    });

    res.json({
      msg: "Login successful ✅",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error during login" });
  }
});

// ------------------ Get logged-in user ------------------
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ msg: "Server error fetching user" });
  }
});

// ------------------ Logout ------------------
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ msg: "Logged out successfully ✅" });
});

module.exports = router;
