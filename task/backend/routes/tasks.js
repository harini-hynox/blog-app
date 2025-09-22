const express = require("express");
const Task = require("../models/Task");
const { createClient } = require("@supabase/supabase-js");

const router = express.Router();

// ✅ Supabase client (server-side only with SERVICE ROLE KEY)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// -------------------- AUTH MIDDLEWARE --------------------
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Missing or invalid Authorization header" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // ✅ Verify user from Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error("❌ Supabase auth error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (!data?.user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = data.user;
    next();
  } catch (err) {
    console.error("❌ Auth middleware error:", err.message);
    return res
      .status(500)
      .json({ message: "Auth check failed", error: err.message });
  }
};

// -------------------- HEALTH CHECK --------------------
router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Tasks API is running 🚀" });
});

// -------------------- CREATE TASK --------------------
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = new Task({
      title,
      description,
      userId: req.user.id, // ✅ link task to logged-in user
      dueDate: dueDate || null,
      priority: priority || "medium",
    });

    await task.save();
    return res.status(201).json(task);
  } catch (err) {
    console.error("❌ Error creating task:", err.message);
    return res
      .status(500)
      .json({ message: "Error creating task", error: err.message });
  }
});

// -------------------- GET ALL TASKS --------------------
router.get("/", auth, async (req, res) => {
  try {
    const { completed, priority } = req.query;

    const filter = { userId: req.user.id };
    if (completed === "true") filter.completed = true;
    if (completed === "false") filter.completed = false;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (err) {
    console.error("❌ Error fetching tasks:", err.message);
    return res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
});

// -------------------- GET ONE TASK --------------------
router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (err) {
    console.error("❌ Error fetching task:", err.message);
    return res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
});

// -------------------- UPDATE TASK --------------------
router.put("/:id", auth, async (req, res) => {
  try {
    const allowedFields = [
      "title",
      "description",
      "completed",
      "dueDate",
      "priority",
    ];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (err) {
    console.error("❌ Error updating task:", err.message);
    return res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
});

// -------------------- DELETE TASK --------------------
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting task:", err.message);
    return res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
});

module.exports = router;
