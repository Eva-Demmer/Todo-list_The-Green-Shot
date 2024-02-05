<template>
  <header>
    <nav class="container">
      <div class="branding">
        <img src="../../assets/logos/logo.svg" alt="logo" />
      </div>
      <ul class="nav-routes">
        <RouterLink :to="{ name: 'home' }">Todos</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router"
</script>

<style lang="scss" scoped>
@import "./header.scss";
</style>
