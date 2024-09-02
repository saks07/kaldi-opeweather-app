type Coord = {
  lon: number
  lat: number
}

type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

type Main = {
  temp: number
  temp_min: number
  feels_like: number
  pressure: number
  temp_max: number
  sea_level: number
  humidity: number
  grnd_level: number
}

type Wind = {
  speed: number
  deg: number
  gust: number
}

type Rain = {
  all: number
}

type Clouds = {
  all: number
}

type Sys = {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

type City = {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  rain: Rain
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

type CityFormat = {
  id: number
  name: string
  country: string
  main: string
  description: string
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  humidity: number
}

type QueryParams = {
  q: string
  appid: string
  units: string
}

export type { City, CityFormat, QueryParams }
