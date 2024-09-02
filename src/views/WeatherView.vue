<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter, type LocationQueryValue } from 'vue-router'
import type { CityFormat } from '@/app/types/city.type'
import CityWeather from '@/components/WeatherComponents/CityWeather.vue'
import { useCityStore } from '@/stores/city'
import AppLoader from '@/components/App/AppLoader.vue'
import SearchComponent from '@/components/WeatherComponents/SearchComponent.vue'

const router = useRouter()
const route = useRoute()
const cityStore = useCityStore()

// LIFECYCLE HOOKS
onMounted(async () => {
  await router.isReady()
  updateCityWeatherData(route.query.q)
})

// METHODS
const updateCityWeatherData = (queryValue: LocationQueryValue | LocationQueryValue[]): void => {
  if (!queryValue) {
    return
  }

  cityStore.getCityWeatherData(String(queryValue))
}

// COMPUTED
const cityWeather = computed<CityFormat | null>(() => {
  return cityStore.cityWeatherData
})

const searchingCityWeather = computed<boolean>(() => {
  return cityStore.searchingCityWeatherData
})

// WATCHERS
watch(route, (value) => {
  updateCityWeatherData(String(value.query.q))
})
</script>

<template>
  <main class="main">
    <SearchComponent />
    <AppLoader v-if="searchingCityWeather" :width="64" :height="64" />
    <CityWeather v-if="cityWeather" :city="cityWeather" />
  </main>
</template>

<style scoped>
.loader-container {
  position: relative;
  width: 100%;
  padding-block: 1.25rem;
  display: flex;
  justify-content: center;
}
</style>
