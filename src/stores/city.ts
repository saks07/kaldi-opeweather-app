import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { CityFormat } from '@/app/types/city.type'
import { CityService } from '@/app/services/city.service'
import { useMessageStore } from './message'

export const useCityStore = defineStore('city', () => {
  const cityService = new CityService()
  const messageStore = useMessageStore()

  // STATE
  const cityData = ref<CityFormat | null>(null)
  const searchingCityData = ref<boolean>(false)
  const searchedCities = ref<CityFormat[]>([])

  // ACTIONS
  const getCityWeatherData = async (cityName: string): Promise<void> => {
    setSearchingCityData(true)

    const result = await cityService.getCityWeather(cityName)

    setSearchingCityData(false)

    if (result.data) {
      setCityWeatherData(result.data)
      const addCity = cityService.setSearchedCities(result.data)
      if (addCity) {
        searchedCities.value.push(result.data)
        setSearchedCitiesWeatherData(searchedCities.value)
      }
      return
    }

    if (result.error) {
      setCityWeatherData(null)
      messageStore.setDisplayMessage(true)
      console.log(result.error)
      messageStore.setMessageText(result.error.message)
      messageStore.setMessageStatus(result.error.cod > 400 ? 'error' : 'default')
    }
  }

  const getSearchedCitiesWeatherData = (): void => {
    searchedCities.value = cityService.getSearchedCities()
  }

  // MUTATIONS
  const setCityWeatherData = (data: CityFormat | null): void => {
    cityData.value = data
  }

  const setSearchingCityData = (data: boolean): void => {
    searchingCityData.value = data
  }

  const setSearchedCitiesWeatherData = (data: CityFormat[]): void => {
    searchedCities.value = data
  }

  // GETTERS
  const cityWeatherData = computed<CityFormat | null>(() => cityData.value)

  const searchingCityWeatherData = computed<boolean>(() => searchingCityData.value)

  const searchedCitiesWeatherData = computed<CityFormat[]>(() => searchedCities.value)

  return {
    getCityWeatherData,
    setCityWeatherData,
    cityWeatherData,
    getSearchedCitiesWeatherData,
    setSearchedCitiesWeatherData,
    searchedCitiesWeatherData,
    searchingCityWeatherData
  }
})
