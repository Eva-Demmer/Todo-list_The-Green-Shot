import TasksModel from "../models/taskModel.js"
import pool from "../../database.js"

const tasksModel = new TasksModel({ table: "tasks" })
tasksModel.setDatabase(pool)

const getAllTasks = async (req, res) => {
  try {
    const tasks = await tasksModel.findAll()
    res.status(200).json(tasks)
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: "❌ An error occurred while retrieving all tasks." })
  }
}

const getTaskById = async (req, res) => {
  try {
    const task = await tasksModel.findById(req.params.id)
    if (!task) {
      res
        .status(404)
        .json({ message: "❌ No task found with the provided ID." })
    } else {
      res.status(200).json(task)
    }
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: "❌ An error occurred while retrieving the task." })
  }
}

const createTask = async (req, res) => {
  try {
    const task = await tasksModel.create(req.body)
    res.status(201).json(task)
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: "❌ An error occurred while creating the task." })
  }
}

const updateTask = async (req, res) => {
  try {
    const task = await tasksModel.update(req.params.id, req.body)
    if (task.affectedRows === 0) {
      res
        .status(404)
        .json({ message: "❌ No task found with the provided ID." })
    } else {
      res.status(200).json(task[0])
    }
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: "❌ An error occurred while updating the task." })
  }
}

const deleteTask = async (req, res) => {
  try {
    const result = await tasksModel.delete(req.params.id)
    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ message: "❌ No task found with the provided ID." })
    } else {
      res.sendStatus(204)
    }
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: "❌ An error occurred while deleting the task." })
  }
}

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask }
