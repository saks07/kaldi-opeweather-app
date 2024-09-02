<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import type { CityFormat } from '@/app/types/city.type'
import { computed, type PropType } from 'vue'

const route = useRoute()

const props = defineProps({
  history: {
    type: Array as PropType<CityFormat[]>
  }
})

// COMPUTED
const routeName = computed<string>(() => {
  return String(route.name)
})
</script>

<template>
  <div class="search-history-container">
    <h2 class="search-history-title">Recent search</h2>
    <ul class="search-history-list">
      <li v-for="item in props.history" :key="item.id" class="search-history-item">
        <RouterLink :to="{ name: routeName, query: { q: item.name } }" class="search-history-link">
          {{ `${item.name}, ${item.country}` }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-history-container {
  position: relative;
  width: 100%;
  margin-top: 1.25rem;
}

.search-history-list {
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  max-width: 100%;
  overflow-y: auto;
  gap: 1.25rem;
}

.search-history-link {
  position: relative;
  display: inline-block;
  padding-block: 0.5rem;
}
</style>
