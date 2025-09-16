const mongoose = require("mongoose");
require("dotenv").config(); // Load .env file

const connectDB = async () => {
  try {
    // Use the connection string from .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Stop the app if DB connection fails
  }
};

module.exports = connectDB;
