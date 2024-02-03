import { Schema, model } from "mongoose"

const taskSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const TaskModel = model("task", taskSchema)

export default TaskModel
