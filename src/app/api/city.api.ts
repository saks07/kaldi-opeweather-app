import { HttpClient } from '../httpClient/httpClient'
import type { ICityApi } from '../interfaces/city.interface'
import type { City, QueryParams } from '../types/city.type'
import { Helper } from '../helper/api.helper'

export class CityApi implements ICityApi {
  private readonly httpClient: HttpClient
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather'
  private queryParams: QueryParams = {
    q: '',
    appid: '',
    units: 'metric'
  }

  constructor() {
    this.httpClient = new HttpClient()
    this.setApiKey()
  }

  private setApiKey(): void {
    this.queryParams.appid = import.meta.env.VITE_OPENWEATHER_API_KEY
  }

  private setQuery(query: string): void {
    this.queryParams.q = query
  }

  async getCityWeather(cityName: string): Promise<City> {
    this.setQuery(cityName)
    const url = Helper.generateRequestUrl(this.baseUrl, this.queryParams)
    return this.httpClient.get<City>(url)
  }
}
