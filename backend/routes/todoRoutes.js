const express = require("express");
const router = express.Router();
const ToDoModel = require("../models/ToDoModel");
const verifyToken = require("../middleware/authMiddleware");


router.get("/get", verifyToken, async (req, res) => {
  try {
    const todos = await ToDoModel.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: "Server error while fetching todos" });
  }
});




router.post("/save", verifyToken, async (req, res) => {
  const { toDo } = req.body;

  if (!toDo || !toDo.trim()) {
    return res.status(400).json({ msg: "Todo text is required" });
  }

  try {
    const newTodo = await ToDoModel.create({
      toDo: toDo.trim(),
      user: req.userId, 
    });

    res.status(201).json(newTodo); 
  } catch (err) {
    console.error("Error saving todo:", err);
    res.status(500).json({ msg: "Server error while saving todo" });
  }
});

router.put("/update/:id", verifyToken, async (req, res) => {
  const { toDo } = req.body;

  if (!toDo || !toDo.trim()) {
    return res.status(400).json({ msg: "Updated text cannot be empty" });
  }

  try {
    const updated = await ToDoModel.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { toDo: toDo.trim() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Todo not found or unauthorized" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ msg: "Server error while updating todo" });
  }
});




router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await ToDoModel.findOneAndDelete({
      _id: req.params.id,
      user: req.userId 
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Todo not found or unauthorized" });
    }

    res.json({ msg: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting todo" });
  }
});

module.exports = router;
