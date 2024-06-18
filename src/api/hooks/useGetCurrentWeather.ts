import { useQuery } from '@tanstack/react-query'

const getWeather = async (location: string) => {
  const apiKey = '8630ff89e58549dba2d82630230707' //process.env.REACT_APP_WEATHER_API_KEY
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Error fetching weather data')
  }

  return response.json()
}

export const useGetCurrentWeather = (location: string) => {
  return useQuery(['weather', location], () => getWeather(location), {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes
  })
}
