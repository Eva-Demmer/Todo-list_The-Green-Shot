<template>
  <q-form @submit="submitForm">
    <span>{{ props.title }}</span>
    <q-input v-model="taskTitle" label="Task" />
    <q-input v-model="taskDescription" label="Description" />
    <q-toggle
      v-model="taskCompletion"
      @input="$emit('toggle-completed', task)"
      checked-icon="check"
      color="green"
      unchecked-icon="clear"
      size="3rem"
    />
    <q-btn
      type="submit"
      :label="props.mode === 'update' ? 'Update Task' : 'Create Task'"
      color="primary"
    />
  </q-form>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch } from "vue"
import { updateTask, createTask } from "../../services/api.tasks"

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true,
    validator: (value) => ["create", "update"].includes(value),
    default: "create"
  },
  task: {
    type: Object,
    default: () => ({})
  }
})

const taskTitle = ref(props.task.title || "")
const taskDescription = ref(props.task.description || "")
const taskCompletion = ref(props.task.completed || false)

watch(props.task, (newTask) => {
  taskTitle.value = newTask.title || ""
  taskDescription.value = newTask.description || ""
  taskCompletion.value = newTask.completed || false
})

const emit = defineEmits(["form-submitted"])

async function submitForm() {
  const taskData = {
    title: taskTitle.value,
    description: taskDescription.value,
    completed: taskCompletion.value
  }

  try {
    if (props.mode === "update") {
      await updateTask(props.task.id, taskData)
      console.log("Task updated successfully")
    } else {
      await createTask(taskData)
      console.log("Task created successfully")
    }
    emit("form-submitted")
  } catch (error) {
    console.error("Failed to perform operation:", error)
  }
}
</script>
