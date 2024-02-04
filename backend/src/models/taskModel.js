class TasksModel {
  constructor({ table }) {
    this.table = table
    this.database = null
  }

  async findAll() {
    try {
      const [tasksData] = await this.database.query(
        `SELECT id, title, description, completed FROM ${this.table}`
      )
      return tasksData
    } catch (err) {
      console.error(err)
    }

    return null
  }

  async findById(id) {
    try {
      const [taskData] = await this.database.query(
        `SELECT id, title, description, completed FROM ${this.table} WHERE id = ?`,
        [id]
      )
      return taskData[0]
    } catch (err) {
      console.error(err)
    }

    return null
  }

  async create(task) {
    try {
      const [taskData] = await this.database.query(
        `INSERT INTO ${this.table}(title, description, completed) VALUES (?, ?, ?)`,
        [task.title, task.description, task.completed]
      )
      return taskData
    } catch (err) {
      console.error(err)
    }

    return null
  }

  async update(id, task) {
    try {
      const [taskData] = await this.database.query(
        `UPDATE ${this.table} SET title = ?, description = ?, completed = ? WHERE id = ?`,
        [task.title, task.description, task.completed, id]
      )
      return taskData
    } catch (err) {
      console.error(err)
    }

    return null
  }

  async delete(id) {
    try {
      const [taskData] = await this.database.query(
        `DELETE FROM ${this.table} WHERE id = ?`,
        [id]
      )
      return taskData
    } catch (err) {
      console.error(err)
    }

    return null
  }

  setDatabase(database) {
    this.database = database
  }
}

export default TasksModel
