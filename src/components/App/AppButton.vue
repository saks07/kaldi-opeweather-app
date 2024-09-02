<script setup lang="ts">
import type { PropType } from 'vue'
import IconLoaderWhite from '../icons/IconLoaderWhite.vue'

// PROPS
const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  classes: {
    type: Array as PropType<String[]>,
    default: () => {
      return []
    }
  },
  text: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// EMITS
const emit = defineEmits(['button-click'])

// METHODS
const buttonClick = (event: Event): void => emit('button-click', event)
</script>

<template>
  <button
    :type="props.type"
    :class="['app-button', `app-button-${props.type}`, ...props.classes]"
    :disabled="props.disabled"
    @click="buttonClick"
  >
    <span v-if="props.disabled" class="button-loader">
      <IconLoaderWhite />
    </span>
    <span v-else class="button-text">
      {{ props.text }}
    </span>
  </button>
</template>

<style scoped>
button {
  position: relative;
  padding: 8px 16px;
  background-color: var(--button-bg, #0ea5e9);
  border-radius: 4px;
  border: 0;
  color: var(--button-text-color, #fff);
  text-transform: capitalize;
  cursor: pointer;
  font-size: 16px;
}

button.transparent {
  background-color: transparent;
  border-radius: 0;
  color: var(--primary-color, #0ea5e9);
}

.button-loader {
  position: relative;
  display: inline-block;
}

.button-loader svg {
  width: 32px;
  height: 32px;
}
</style>
