import express from "express"
import TaskModel from "../models/taskModel.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const tasks = await TaskModel.find()
    if (!tasks || tasks.length === 0) throw new Error("No tasks found")
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/", async (req, res) => {
  const newTask = new TaskModel(req.body)
  try {
    const task = await newTask.save()
    if (!task) throw new Error("Oops, something went wrong saving the task")
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const removedTask = await TaskModel.findByIdAndDelete(id)
    if (!removedTask)
      throw new Error("Oops, something went wrong deleting the task")
    res.status(200).json(removedTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
