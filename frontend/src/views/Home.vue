<template>
  <main>
    <h5>Your todos</h5>
    <NewTodo @new-todo="() => openModal(null, 'new')" />
    <span>Number of todos: {{ allTodos.length }}</span>
    <ul>
      <li v-for="todo in allTodos" :key="todo.id">
        <TodoCard
          :todo="todo"
          :todoTitle="todo.title"
          :todoDescription="todo.description"
          @delete-todo="deleteTodo"
          @modify-todo="(task) => openModal(task, 'modify')"
        />
      </li>
    </ul>
    <Modal id="modify-todo" :opened="showModal" header="Edit a todo" @modalClosed="closeModal">
      <Form
        title="What do you want to change?"
        mode="update"
        :task="selectedTask"
        @form-submitted="() => handleFormSubmitted('modify')"
      />
    </Modal>
    <Modal
      id="new-todo"
      :opened="showNewTodoModal"
      header="Add a new todo"
      @modalClosed="closeNewTodoModal"
    >
      <Form
        title="What's your new task"
        mode="create"
        @form-submitted="() => handleFormSubmitted('new')"
      />
    </Modal>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getTasks, deleteTask } from "../services/api.tasks"
import NewTodo from "../components/buttons/NewTodo.vue"
import TodoCard from "../components/todos/TodoCard.vue"
import Modal from "../components/modal/Modal.vue"
import Form from "../components/form/Form.vue"

const allTodos = ref([])
const selectedTask = ref(null)
const showModal = ref(false)
const showNewTodoModal = ref(false)

async function loadTasks() {
  try {
    const data = await getTasks()
    allTodos.value = data
  } catch (error) {
    console.error(error)
  }
}

async function deleteTodo(todoToDelete) {
  if (todoToDelete) {
    try {
      await deleteTask(todoToDelete.id)
      allTodos.value = allTodos.value.filter((task) => task.id !== todoToDelete.id)
    } catch (error) {
      console.error(error)
    }
  }
}

function openModal(task, modalType) {
  selectedTask.value = task
  if (modalType === "modify") {
    showModal.value = true
  } else if (modalType === "new") {
    showNewTodoModal.value = true
  }
}

function closeModal() {
  showModal.value = false
}

function handleFormSubmitted(modalType) {
  loadTasks()
  if (modalType === "modify") {
    closeModal()
  } else if (modalType === "new") {
    closeNewTodoModal()
  }
}
function closeNewTodoModal() {
  showNewTodoModal.value = false
}

onMounted(loadTasks)
</script>

<style scoped lang="scss">
@import "./home.scss";
</style>
