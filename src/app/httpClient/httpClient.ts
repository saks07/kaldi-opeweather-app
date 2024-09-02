export class HttpClient {
  private readonly abortRequest = 2500

  async get<T>(url: string, headers: { [key: string]: string } = {}, config?: any): Promise<T> {
    const controller = new AbortController()
    const signal = controller.signal

    // Cancel the fetch request in 2500ms
    setTimeout(() => controller.abort(), this.abortRequest)

    const configAppend = config ? { ...config, signal } : { signal }
    const response = await fetch(url, {
      method: 'GET',
      headers,
      ...configAppend
    })

    if (!response.ok) {
      throw new Error(`${response.statusText}`, { cause: response })
    }

    const data = await response.json()
    return data
  }

  async post<T>(url: string, config?: any): Promise<T> {
    const controller = new AbortController()
    const signal = controller.signal

    // Cancel the fetch request in 2500ms
    setTimeout(() => controller.abort(), this.abortRequest)

    const configAppend = config ? { ...config, signal } : { signal }
    const response = await fetch(url, configAppend)

    if (!response.ok) {
      throw new Error(`${response.statusText}`, { cause: response })
    }

    const data = await response.json()
    return data
  }
}
