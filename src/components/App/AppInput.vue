<script setup lang="ts">
import type { PropType } from 'vue'

// PROPS
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: () => {
      return null
    }
  },
  classes: {
    type: Array as PropType<String[]>,
    default: () => {
      return []
    }
  },
  value: {
    type: String,
    default: ''
  },
  error: {
    type: Boolean,
    default: false
  }
})

// EMITS
const emit = defineEmits(['input-blur', 'input-focus', 'input-change'])

// METHODS
const inputBlur = (event: Event): void => emit('input-blur', event)

const inputFocus = (event: Event): void => emit('input-focus', event)

const inputChange = (event: Event): void => emit('input-change', event.target?.value ?? '')
</script>

<template>
  <div class="input-wrapper">
    <label v-if="props.label" for="">{{ props.label }}</label>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :class="[
        'app-input',
        `app-input-${props.type}`,
        ...props.classes,
        { 'input-error': props.error }
      ]"
      :value="props.value"
      @blur="inputBlur"
      @focus="inputFocus"
      @input="inputChange"
    />
  </div>
</template>

<style scoped>
input:not(.app-input-submit) {
  position: relative;
  border: 1px solid var(--input-border-color, #c0c0c0);
  border-radius: 4px;
  padding: 8px 16px;
  background-color: var(--input-bg, #fff);
}

input::placeholder {
  color: var(--input-placeholder-color, #c0c0c0);
}

input:focus {
  outline: none;
  border: 1px solid var(--primary-color, #0ea5e9);
}

input[type='submit'] {
  position: relative;
  padding: 8px 16px;
  background-color: var(--button-bg, #0ea5e9);
  border-radius: 4px;
  border: 0;
  color: var(--button-text-color, #fff);
  text-transform: capitalize;
  cursor: pointer;
}

input.input-error {
  border-color: var(--error-color);
}
</style>
