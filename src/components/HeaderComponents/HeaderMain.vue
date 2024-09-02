<script setup lang="ts">
import NavigationComponent from './NavigationComponent.vue'
</script>

<template>
  <header class="container header">
    <div class="wrapper">
      <NavigationComponent />
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--header-bg, #fff);
  padding-block: 1.25rem;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
}
</style>
