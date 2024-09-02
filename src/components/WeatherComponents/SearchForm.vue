<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCityStore } from '@/stores/city'
import AppInput from '../App/AppInput.vue'
import AppButton from '../App/AppButton.vue'

type ErrorMessages = { required: string; 'letters-only': string }

const router = useRouter()
const route = useRoute()
const cityStore = useCityStore()

// DATA PROPERTIES
const errorMessage = ref<string>('')
const searchInputModel = ref<string>('')

// CONSTANTS
const ERROR_MESSAGES: ErrorMessages = {
  required: 'Please insert the name of the city',
  'letters-only': 'Only letters allowed'
}

// LIFECYCLE METHODS
onMounted(async () => {
  await router.isReady()
  searchInputModel.value = route.query.q ? String(route.query.q) : ''
})

// METHODS
const searchCity = async (event: Event): Promise<void> => {
  event.preventDefault()
  resetErrorMessage()
  const validateSearchValue = validateInput()
  if (!validateSearchValue) {
    return
  }

  await cityStore.getCityWeatherData(searchInputModel.value)
  router.push({ name: route.name, query: { q: searchInputModel.value } })
}

const setErrorMessage = (key: keyof ErrorMessages): string => {
  if (!key) {
    return ''
  }

  return ERROR_MESSAGES[key]
}

const resetErrorMessage = (): void => {
  errorMessage.value = ''
}

const validateInput = (): boolean => {
  if (searchInputModel.value === '') {
    errorMessage.value = setErrorMessage('required')
    return false
  }

  // TEST VALUE FOR LETTERS ONLY
  const testSearchValue = new RegExp('^(([a-zA-Z ](,)?)*)+$', 'g').test(searchInputModel.value)
  if (testSearchValue === false) {
    errorMessage.value = setErrorMessage('letters-only')
    return false
  }

  return true
}

const clearSearch = (): void => {
  searchInputModel.value = ''
}

const inputChange = (value: string): void => {
  searchInputModel.value = value
}

// COMPUTED
const inputError = computed<boolean>(() => {
  return Boolean(errorMessage.value.length)
})

const searchingCityWeather = computed<boolean>(() => {
  return cityStore.searchingCityWeatherData
})

// WATCHERS
watch(route, (value) => {
  if (!value.query.q) {
    return
  }

  searchInputModel.value = String(value.query.q)
})
</script>

<template>
  <form class="search-form" @submit="searchCity($event)">
    <div class="input-container">
      <AppInput
        :placeholder="'Search city ...'"
        :classes="['search-input']"
        :value="searchInputModel"
        :error="inputError"
        @input-change="inputChange"
      />
      <AppButton
        v-show="searchInputModel.length"
        :text="'clear'"
        :classes="['transparent', 'clear-search']"
        @button-click="clearSearch"
      />
    </div>
    <div class="button-container">
      <AppButton
        :type="'submit'"
        :classes="['search-button']"
        :text="'search'"
        :disabled="searchingCityWeather"
      />
    </div>
    <div v-show="errorMessage.length" class="error-message">{{ errorMessage }}</div>
  </form>
</template>

<style scoped>
.search-form {
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.input-container {
  position: relative;
  display: flex;
  margin-right: 1.25rem;
}

.clear-search {
  position: absolute;
  right: 0;
}

.error-message {
  position: relative;
  width: 100%;
  color: var(--error-color);
  font-size: 0.75rem;
  margin-top: 0.625rem;
}
</style>
