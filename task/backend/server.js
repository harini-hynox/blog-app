require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const app = express();

// ✅ Connect MongoDB
connectDB();

// ✅ Middlewares
app.use(cors({
  origin: "http://localhost:3000",  // frontend URL
  credentials: true,                // allow cookies
}));
app.use(express.json());
app.use(cookieParser());  // <-- important for cookies

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

// ✅ Root check
app.get("/", (req, res) => res.send("Backend is running!"));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
