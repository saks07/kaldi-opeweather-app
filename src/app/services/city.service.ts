import type { City, CityFormat } from '../types/city.type'
import { CityApi } from '../api/city.api'
import type { Result } from '../httpClient/httpClient.interface'
import type { ICityService } from '../interfaces/city.interface'
import { Helper } from '../helper/api.helper'

const SEARCHED_CITIES_KEY = 'SC'

export class CityService implements ICityService {
  private readonly cityApi: CityApi
  private searchedCities: CityFormat[] = []

  constructor() {
    this.cityApi = new CityApi()
    this.searchedCities = this.getSearchedCities()
  }

  async getCityWeather(cityName: string): Promise<Result<CityFormat>> {
    try {
      const response = await this.cityApi.getCityWeather(cityName)
      const mappedData = this.mapCityData(response)
      return {
        data: mappedData
      }
    } catch (err) {
      return {
        error: Helper.setApiError(err as Error)
      }
    }
  }

  private mapCityData(data: City): CityFormat {
    return {
      id: data.sys.id,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_max: data.main.temp_max,
      temp_min: data.main.temp_min,
      humidity: data.main.humidity,
      name: data.name,
      country: data.sys.country,
      main: data.weather[0]?.main ?? '',
      description: data.weather[0]?.description
    }
  }

  setSearchedCities(cityData: CityFormat): boolean {
    // CHECK CITY EXISTENCE
    const checkCity = this.searchedCities.find((item) => item.id === cityData.id)
    if (checkCity) {
      return false
    }

    this.searchedCities.push(cityData)
    localStorage.setItem(SEARCHED_CITIES_KEY, JSON.stringify(this.searchedCities))
    return true
  }

  getSearchedCities(): CityFormat[] {
    // CHECK CLASS CACHED VALUE
    if (this.searchedCities.length) {
      return this.searchedCities
    }

    // CHECK LOCAL STORAGE VALUE
    const checkLocalStorage = localStorage.getItem(SEARCHED_CITIES_KEY)
    if (checkLocalStorage) {
      return JSON.parse(checkLocalStorage)
    }

    return []
  }
}
