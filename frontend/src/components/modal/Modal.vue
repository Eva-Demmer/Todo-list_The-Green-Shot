<template>
  <div :id="id" class="modal" :class="{ actived: opened }" @click.self="closingModal">
    <div v-if="opened" class="modal-content" :style="'max-width:' + width + 'px'">
      <div class="modal-header">
        <div v-html="header" />
        <Button
          v-if="closeButton"
          class="modal-closer"
          icon="cancel"
          aria-label="fermer"
          padding="none"
          @click="closingModal"
        />
      </div>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch, onMounted, onBeforeUnmount } from "vue"
import { defineAsyncComponent } from "vue"

const Button = defineAsyncComponent(() => import("../buttons/Button.vue"))

const props = defineProps({
  id: {
    type: String,
    default: ""
  },
  header: {
    type: String,
    default: ""
  },
  opened: {
    type: Boolean,
    default: false
  },
  closeButton: {
    type: Boolean,
    default: true
  },
  width: {
    type: Number,
    default: 600
  }
})

const emit = defineEmits(["modalOpened", "update:opened", "modalClosed"])

watch(
  () => props.opened,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      if (newValue === true) {
        emit("modalOpened")
      } else {
        closingModal()
      }
    }
  }
)

function closingModal() {
  if (props.opened === true) {
    emit("update:opened", false)
  }
  setTimeout(() => {
    emit("modalClosed")
  }, 300)
}

function closeOnEscape(event) {
  if (event.keyCode === 27 && props.opened === true) {
    closingModal()
  }
}

onMounted(() => {
  document.addEventListener("keydown", closeOnEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener("keydown", closeOnEscape)
})
</script>

<style scoped lang="scss">
@import "./modal.scss";
</style>
