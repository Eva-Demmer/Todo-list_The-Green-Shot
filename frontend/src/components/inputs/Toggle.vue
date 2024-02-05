<template>
  <div class="toggle">
    <q-toggle
      v-model="value"
      dense
      checked-icon="check"
      color="green"
      unchecked-icon="clear"
      size="3rem"
    />
    <input v-model="value" type="hidden" :name="name" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue"

const props = defineProps({
  modelValue: {
    type: [Boolean, Number],
    default: undefined
  },
  value: {
    type: [Boolean, Number],
    default: false
  },
  name: {
    type: String,
    default: ""
  }
})

const emit = defineEmits(["update:modelValue", "updated"])

const localValue = ref(!!props.value)

const value = computed({
  get() {
    if (props.modelValue !== undefined) {
      return !!props.modelValue
    }
    return localValue.value
  },
  set(newValue) {
    if (props.modelValue !== undefined) {
      emit("update:modelValue", newValue)
    } else {
      localValue.value = newValue
      emit("updated", newValue)
    }
  }
})

watch(
  () => props.value,
  (newVal) => {
    localValue.value = !!newVal
  }
)
</script>
