require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


const app = express();

// ✅ Connect MongoDB
connectDB();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks")); // new tasks route
// ✅ Root check
app.get("/", (req, res) => res.send("Backend is running!"));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
