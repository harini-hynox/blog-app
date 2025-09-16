const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// Get all tasks for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Get Tasks Error:", err.message);
    res.status(500).json({ msg: "Server error fetching tasks" });
  }
});

// Create a new task
router.post("/", auth, async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) return res.status(400).json({ msg: "Please provide title and body" });

  try {
    const newTask = new Task({
      user: req.user.id,
      title,
      body,
    });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error("Add Task Error:", err.message);
    res.status(500).json({ msg: "Server error creating task" });
  }
});

// Update a task
router.put("/:id", auth, async (req, res) => {
  const { title, body } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });

    task.title = title || task.title;
    task.body = body || task.body;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error("Update Task Error:", err.message);
    res.status(500).json({ msg: "Server error updating task" });
  }
});

//  Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Unauthorized" });

    await task.remove();
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error("Delete Task Error:", err.message);
    res.status(500).json({ msg: "Server error deleting task" });
  }
});

module.exports = router;
