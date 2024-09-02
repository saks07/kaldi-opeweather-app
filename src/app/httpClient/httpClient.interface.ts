type ApiError = {
  cod: number
  message: string
  parameters?: string[]
}

type Result<T> = {
  data?: T | null
  error?: ApiError
}

export type { Result, ApiError }
