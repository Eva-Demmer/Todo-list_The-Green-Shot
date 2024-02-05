import express from "express"
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getCompletedCount,
} from "./controllers/taskController.js"

const router = express.Router()

router.get("/tasks", getAllTasks)
router.get("/tasks/:id", getTaskById)
router.get("/tasks/completed/count", getCompletedCount)
router.post("/tasks", createTask)
router.put("/tasks/:id", updateTask)
router.delete("/tasks/:id", deleteTask)

export default router
