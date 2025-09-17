const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/Task");

const router = express.Router();

// Create Task
router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({
      title,
      description,
      userId: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err.message });
  }
});

// Get All User Tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
});

// Update Task
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, description, completed },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", error: err.message });
  }
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
});

module.exports = router;
