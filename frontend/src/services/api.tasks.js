const url = "http://localhost:6006"
const route = "/tasks"

function getTasks() {
  return fetch(`${url}${route}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
    })
}

function getTaskById(id) {
  return fetch(`${url}${route}/${id}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
    })
}

function createTask(task) {
  return fetch(`${url}${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
    })
}

function updateTask(id, updatedTask) {
  return fetch(`${url}${route}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedTask)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.text().then((text) => (text ? JSON.parse(text) : {}))
    })
    .catch((error) => {
      console.error(error)
    })
}

function deleteTask(id) {
  return fetch(`${url}${route}/${id}`, {
    method: "DELETE"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

function getCompletedCount() {
  return fetch(`${url}${route}/completed/count`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
    })
}

export { getTasks, getTaskById, createTask, updateTask, deleteTask, getCompletedCount }
