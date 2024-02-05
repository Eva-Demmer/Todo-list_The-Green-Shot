<template>
  <q-btn rounded no-caps :ripple="{ center: true }" class="btn">
    <slot />
  </q-btn>
</template>

<style lang="scss">
@import "./button.scss";
</style>
