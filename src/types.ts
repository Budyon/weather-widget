type ResponseLatLongData = {
  lon: number
  lat: number
}

type ResponseWeatherData = {
  id: number
  main: string
  description: string
  icon: string
}

type ResponseMainData = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

type ResponseWindData = {
  speed: number
  deg: number
}

type ResponseCloudData = {
  all: number
}

type ResponseSysData = {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

export type WeatherResponse = {
  coord: ResponseLatLongData
  weather:ResponseWeatherData[]
  base: string
  main: ResponseMainData
  visibility: number
  wind: ResponseWindData
  clouds: ResponseCloudData
  dt: number
  sys: ResponseSysData
  timezone: number
  id: number
  name: string
  cod: number
} 

export type City = {
  name: string
  code: string
  flag: string
  weather?: Weather
}

export type Weather = {
  icon: string
  city: string
  code: string
  feelsLike: number
  humidity: number
  visibility: string
  temp: number
  description: string
  main: string
  pressure: number
  windSpeed: string
  dewPoint: number
}