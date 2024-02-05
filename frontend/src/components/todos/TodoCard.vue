<template>
  <div class="todo-card">
    <div class="task-details">
      <span class="task-title">{{ taskTitle }}</span>
      <p class="task-description">{{ taskDescription }}</p>
      <q-toggle
        v-model="taskCompletion"
        @input="$emit('toggle-completed', todo)"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        size="3rem"
      />
    </div>
    <div class="action-buttons">
      <Button size="md" @click="$emit('modify-todo', todo)" icon="edit" class="btn-yellow" />
      <Button
        size="md"
        @click="$emit('delete-todo', todo)"
        icon="delete"
        class="btn-outline-pink"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue"
import Button from "../buttons/Button.vue"

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const taskTitle = ref(props.todo.title || "")
const taskDescription = ref(props.todo.description || "")
const taskCompletion = ref(Boolean(props.todo.completed))

watch(props.todo, (newTodo) => {
  taskTitle.value = newTodo.title || ""
  taskDescription.value = newTodo.description || ""
  taskCompletion.value = newTodo.completed || false
})

const emit = defineEmits(["delete-todo", "modify-todo", "toggle-completed"])
</script>

<style scoped lang="scss">
@import "./todoCard.scss";
</style>
