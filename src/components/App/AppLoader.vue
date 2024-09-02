<script setup lang="ts">
import IconLoaderPrimary from '../icons/IconLoaderPrimary.vue'

const props = defineProps({
  width: {
    type: Number,
    default: 32
  },
  height: {
    type: Number,
    default: 32
  }
})
</script>

<template>
  <div class="loader-container">
    <IconLoaderPrimary :width="props.width" :height="props.height" />
  </div>
</template>
