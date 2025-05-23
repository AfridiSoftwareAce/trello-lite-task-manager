const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { taskSchema } = require("../validators/taskValidator");

router.use(protect);

router.get("/tasks", getTasks);
router.post("/tasks", validate(taskSchema), createTask);
router.put("/tasks/:id", validate(taskSchema), updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
