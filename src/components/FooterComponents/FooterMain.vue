<script setup lang="ts">
import { ref, onMounted } from 'vue'

const copyrightDate = ref<number>(0)

onMounted(() => {
  copyrightDate.value = new Date(Date.now()).getFullYear()
})
</script>

<template>
  <header class="container footer">
    <div class="wrapper">&copy; All rights reserved {{ copyrightDate }}</div>
  </header>
</template>

<style scoped>
.footer {
  margin-top: 2rem;
  color: var(--footer-text-color, #757575);
}

.wrapper {
  border-top: 1px solid var(--footer-border-color, #959595);
  padding-block: 2rem;
}
</style>
