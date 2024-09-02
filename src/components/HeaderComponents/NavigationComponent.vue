<script setup lang="ts">
import type { PropType } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  navClasses: {
    type: Array as PropType<String[]>,
    default: () => {
      return []
    }
  }
})
</script>

<template>
  <nav :class="['navigation', ...props.navClasses]">
    <ul class="navigation-list">
      <li class="navigation-item">
        <RouterLink :to="{ name: 'HomeView' }">Home</RouterLink>
      </li>
      <li class="navigation-item">
        <RouterLink :to="{ name: 'WeatherView' }" class="navigation-link">Weather</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navigation-list {
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;

  display: flex;
  align-items: flex-start;
  gap: 0.938rem;
  flex-wrap: wrap;
}

.navigation-link {
  color: var(--primary-color, #0ea5e9);
}

.home-view-navigation .navigation-list {
  justify-content: center;
}
</style>
