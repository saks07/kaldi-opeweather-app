import type { Result } from '../httpClient/httpClient.interface'
import type { City, CityFormat } from '../types/city.type'

export interface ICityApi {
  getCityWeather: (cityName: string) => Promise<City>
}

export interface ICityService {
  getCityWeather: (cityName: string) => Promise<Result<CityFormat>>
  setSearchedCities: (cityData: CityFormat) => boolean
  getSearchedCities: () => CityFormat[]
}

export interface IHelper {
  generateRequestUrl: (baseUrl: string, queryParams: string) => string
}
