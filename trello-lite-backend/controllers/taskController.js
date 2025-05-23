const Task = require("../models/Task");

// GET /tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

// POST /tasks
const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  const newTask = await Task.create({
    userId: req.user.id,
    title,
    description,
    status,
    dueDate,
  });

  res.status(201).json(newTask);
};

// PUT /tasks/:id
const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );

  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

// DELETE /tasks/:id
const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
