<template>
  <main>
    <h5>Your todos</h5>
    <div class="btn-add-task">
      <Button @click="openCreateModal()" label="Add new task" icon="add" class="btn-blue" />
    </div>
    <span>🎉 Completed tasks: {{ completedCount }}</span>

    <!-- Todo card -->
    <ul>
      <li v-for="todo in allTodos" :key="todo.id">
        <div class="todo-card">
          <div class="task-details">
            <span class="task-title">{{ todo.title }}</span>
            <p class="task-description">{{ todo.description }}</p>
            <Toggle
              v-model="todo.completed"
              name="completed"
              @update:modelValue="(newValue) => handleToggleChange(todo, newValue)"
            />
          </div>
          <div class="action-buttons">
            <Button @click="openModifyModal(todo.id)" size="md" icon="edit" class="btn-yellow" />
            <Button @click="deleteTodo(todo.id)" size="md" icon="delete" class="btn-outline-pink" />
          </div>
        </div>
      </li>
    </ul>

    <!-- Modal -->
    <Modal
      id="modify-todo"
      header="Edit a todo"
      :opened="showModal.modify"
      @modalClosed="closeModal"
    >
      <div class="form">
        <q-form @submit="submitForm">
          <q-input v-model="selectedTodo.title" label="Title" />
          <q-input v-model="selectedTodo.description" label="Description" />
          <Toggle v-model="selectedTodo.completed" />
          <Button type="submit" class="btn-blue btn-submit">Confirmer</Button>
        </q-form>
      </div>
    </Modal>

    <Modal
      id="new-todo"
      header="Add a new todo"
      :opened="showModal.create"
      @modalClosed="closeModal"
    >
      <div class="form">
        <q-form @submit="submitCreateForm(createTodo)">
          <q-input v-model="createTodo.title" label="Title" />
          <q-input v-model="createTodo.description" label="Description" />
          <Toggle v-model="createTodo.completed" />
          <Button type="submit" class="btn-blue btn-submit">Confirmer</Button>
        </q-form>
      </div>
    </Modal>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue"
import {
  createTask,
  getTasks,
  getTaskById,
  getCompletedCount,
  updateTask,
  deleteTask
} from "../services/api.tasks"
import Toggle from "../components/inputs/Toggle.vue"
import Button from "../components/buttons/Button.vue"
import Modal from "../components/modal/Modal.vue"

const allTodos = ref([])
const selectedTodo = ref({})
const completedCount = ref(0)
const showModal = ref({
  create: false,
  modify: false
})
const createTodo = ref({
  title: "",
  description: "",
  completed: false
})

function openCreateModal() {
  showModal.value.create = true
}

function openModifyModal(todoId) {
  showModal.value.modify = true
  loadTaskById(todoId)
}

function closeModal() {
  showModal.value.create = false
  showModal.value.modify = false
  loadTasks()
}

function submitForm() {
  modifyTask(selectedTodo.value.id, selectedTodo.value)
  closeModal()
}

function submitCreateForm(createTodo) {
  createNewTodo(createTodo)
}

// MANIPULATE TASKS
async function createNewTodo(todo) {
  try {
    await createTask(todo)
    closeModal()
  } catch (error) {
    console.error(error)
  }
}

async function loadTasks() {
  try {
    const tasks = await getTasks()
    allTodos.value = tasks
    const completedTodosCount = await getCompletedCount()
    completedCount.value = completedTodosCount.completedCount
  } catch (error) {
    console.error(error)
  }
}

async function loadTaskById(taskId) {
  try {
    const task = await getTaskById(taskId)
    selectedTodo.value = task
  } catch (error) {
    console.error(error)
  }
}

async function modifyTask(taskId, taskData) {
  try {
    const updatedTask = await updateTask(taskId, taskData)
    selectedTodo.value = updatedTask
  } catch (error) {
    console.error(error)
  }
}

async function handleToggleChange(todo, newValue) {
  todo.completed = newValue
  try {
    const updatedTask = await updateTask(todo.id, todo)
    selectedTodo.value = updatedTask
  } catch (error) {
    console.error(error)
  }
}

async function deleteTodo(taskId) {
  try {
    await deleteTask(taskId)
    selectedTodo.value = {}
    loadTasks()
  } catch (error) {
    console.error(error)
  }
}

onMounted(loadTasks)
</script>

<style scoped lang="scss">
@import "./home.scss";
</style>
