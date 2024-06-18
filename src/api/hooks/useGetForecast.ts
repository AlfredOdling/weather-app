import { useQuery } from '@tanstack/react-query'

const apiKey = '8630ff89e58549dba2d82630230707' //process.env.REACT_APP_WEATHER_API_KEY

export enum UrlMap {
  weekly = 'weekly',
  hourly = 'hourly',
}

const getForecast = async (
  location: string,
  timebox: string,
  dateValue?: Date | null
) => {
  const formattedDate = dateValue?.toISOString().split('T')[0] || ''

  const getWeeklyUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7` // Will only get 1 result if using dates
  const getHourlyUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&hours=24&dt=${formattedDate}`

  const urlMap = {
    weekly: getWeeklyUrl,
    hourly: getHourlyUrl,
  }

  const response = await fetch(urlMap[timebox])
  if (!response.ok) {
    throw new Error('Error fetching weather data')
  }

  return await response.json()
}

export const useGetForecast = (
  location: string,
  timebox,
  dateValue?: Date | null
) => {
  return useQuery(
    ['weekly-weather', timebox, location],
    () => getForecast(location, timebox, dateValue),
    {
      staleTime: 600000, // 10 minutes
      cacheTime: 900000, // 15 minutes
    }
  )
}
