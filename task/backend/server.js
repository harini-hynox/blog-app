const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task"); // keep singular "task" for consistency

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS for frontend
app.use(cors({ origin: "http://localhost:3000" }));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => res.send("Hello Hynox API 🚀"));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
