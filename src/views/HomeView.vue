<script setup lang="ts">
import NavigationComponent from '@/components/HeaderComponents/NavigationComponent.vue'
</script>

<template>
  <main class="main">
    <div class="logo-container">
      <img class="vue-logo" src="@/assets/logo.svg" alt="vue logo" />
    </div>
    <h1 class="app-title">Openweather application</h1>
    <NavigationComponent :navClasses="['home-view-navigation']" />
  </main>
</template>

<style scoped>
.logo-container {
  position: relative;
  text-align: center;
  margin-block: 2.5rem;
}

.vue-logo {
  position: relative;
  max-width: 256px;
  width: 100%;
  height: auto;
}

.app-title {
  text-align: center;
  text-transform: uppercase;
}

.home-view-navigation {
  margin-top: 3.75rem;
}
</style>
