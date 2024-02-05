<template>
  <div>
    <Button @click="$emit('new-todo')" label="Add new task" icon="add" class="btn-blue"></Button>
  </div>
</template>

<script setup>
import Button from "../buttons/Button.vue"
</script>
