import type { ApiError } from '../httpClient/httpClient.interface'
import type { QueryParams } from '../types/city.type'

export class Helper {
  static generateRequestUrl(baseUrl: string, queryParams: QueryParams): string {
    const url = new URL(baseUrl)
    url.search = new URLSearchParams(queryParams).toString()
    return url.toString()
  }

  static setApiError(error: Error): ApiError {
    return {
      cod: error.cause.status,
      message: error.message
    }
  }
}
