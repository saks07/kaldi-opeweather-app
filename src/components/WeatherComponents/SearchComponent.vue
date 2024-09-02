<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCityStore } from '@/stores/city'
import SearchHistory from './SearchHistory.vue'
import SearchForm from './SearchForm.vue'
import type { CityFormat } from '@/app/types/city.type'

const cityStore = useCityStore()

// DATA PROPERTIES
const showSearchHistory = ref<boolean>(false)

// LIFECYCLE HOOKS
onMounted(() => {
  cityStore.getSearchedCitiesWeatherData()
})

// METHODS
const displaySearchHistory = (isShown: boolean): void => {
  showSearchHistory.value = isShown
}

// COMPUTED
const searchHistoryData = computed<CityFormat[]>(() => {
  return cityStore.searchedCitiesWeatherData
})
</script>

<template>
  <div class="search-container">
    <SearchForm @input-focus-blur="displaySearchHistory" />
    <SearchHistory :history="searchHistoryData" />
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-block: 2rem;
  padding: 1.25rem;
  background-color: #fff;
  border-radius: 8px;
  z-index: 1;
}
</style>
