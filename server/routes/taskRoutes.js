const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getUserTasks, addTask, editTask, removeTask } = require("../controllers/taskController");

router.get("/tasks", authMiddleware, getUserTasks);
router.post("/tasks", authMiddleware, addTask);
router.put("/tasks/:id", authMiddleware, editTask);
router.delete("/tasks/:id", authMiddleware, removeTask);

module.exports = router;