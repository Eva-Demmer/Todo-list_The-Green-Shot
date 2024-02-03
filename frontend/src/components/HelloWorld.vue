<template>
  <h1>{{ msg }}</h1>
  <h3>
    You’ve successfully created a project with
    <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
    <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
  </h3>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
/* import stylesheet or style direclty */
</style>
