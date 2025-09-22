const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS for frontend
app.use(cors({
  origin: "http://localhost:3000",
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => res.send("Hello Hynox API 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
