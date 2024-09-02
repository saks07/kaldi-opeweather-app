<script setup lang="ts">
import type { CityFormat } from '@/app/types/city.type'
import { computed, type PropType } from 'vue'

// PROPS
const props = defineProps({
  city: {
    type: Object as PropType<CityFormat>,
    required: true
  }
})

const temperatureUnit: string = '&deg;C'

// COMPUTED
const cityName = computed<string>(() => {
  return props.city.name
})

const cityCountry = computed<string>(() => {
  return props.city.country
})

const weatherMain = computed<string>(() => {
  return props.city.main
})

const weatherDescription = computed<string>(() => {
  return props.city.description
})

const temperature = computed<string>(() => {
  return `${props.city.temp}${temperatureUnit}`
})

const feelsLike = computed<string>(() => {
  return `${props.city.feels_like}${temperatureUnit}`
})

const tempMin = computed<string>(() => {
  return `${props.city.temp_min}${temperatureUnit}`
})

const tempMax = computed<string>(() => {
  return `${props.city.temp_max}${temperatureUnit}`
})

const humidity = computed<string>(() => {
  return `${props.city.humidity}%`
})
</script>

<template>
  <div class="weather-card">
    <div class="wrapper">
      <div class="block left-block">
        <h2 class="city-name">
          {{ cityName }}, <span class="city-country">{{ cityCountry }}</span>
        </h2>
        <div class="city-description">
          {{ weatherMain }}, <span class="city-country">{{ weatherDescription }}</span>
        </div>
      </div>
      <div class="block right-block">
        <div class="weather-data temperature">
          <h3 class="weather-data-title">temperature:</h3>
          <span class="weather-data-value" v-html="temperature"></span>
        </div>
        <div class="weather-data feels-like">
          <h3 class="weather-data-title">feels like:</h3>
          <span class="weather-data-value" v-html="feelsLike"></span>
        </div>
        <div class="weather-data temp-min">
          <h3 class="weather-data-title">temperature (min):</h3>
          <span class="weather-data-value" v-html="tempMin"></span>
        </div>
        <div class="weather-data temp-max">
          <h3 class="weather-data-title">temperature (max):</h3>
          <span class="weather-data-value" v-html="tempMax"></span>
        </div>
        <div class="weather-data humidity">
          <h3 class="weather-data-title">humidity:</h3>
          <span class="weather-data-value" v-html="humidity"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  position: relative;
  margin-block: 3.75rem;
  border-radius: 8px;
  padding: 1.25rem;
  background-color: #fff;
}

.wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.block {
  position: relative;
  padding: 1.25rem;
}

.right-block {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.938rem;
}

.city-name {
  font-size: 2rem;
}

.weather-data {
  position: relative;
  border-radius: 4px;
  background-color: #f8f8f8;
  padding: 0.625rem;
  flex: 1 1 48%;
}

.weather-data-title {
  text-transform: uppercase;
  margin-bottom: 0.625rem;
}

.weather-data-value {
  color: var(--primary-color);
  font-size: 1.25rem;
  font-weight: 700;
}
</style>
