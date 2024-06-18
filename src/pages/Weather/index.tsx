import {
  Grid,
  Group,
  SegmentedControl,
  Space,
  Stack,
  Title,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { readSessionStorageValue } from '@mantine/hooks'
import {
  IconCloudRain,
  IconRipple,
  IconTemperature,
  IconWind,
} from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useGetCurrentWeather } from 'src/api/hooks/useGetCurrentWeather'
import { UrlMap, useGetForecast } from 'src/api/hooks/useGetForecast'
import { container } from 'src/shared/styles/styles'

import { WeatherCard } from './components/WeatherCard'
import { WeatherGridColHourly } from './components/WeatherGridColHourly'
import { WeatherGridColWeekly } from './components/WeatherGridColWeekly'

export const Weather = () => {
  const date = new Date()
  const [timebox, setTimebox] = useState('weekly')
  const [dateValue, setDateValue] = useState<Date | null>(date)
  const user: any = readSessionStorageValue({ key: 'user' })

  const currentWeather = useGetCurrentWeather(user.location)
  const weeklyForecast = useGetForecast(user.location, UrlMap.weekly)
  const hourlyForecast = useGetForecast(user.location, UrlMap.hourly, dateValue)

  const formattedDate = date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  useEffect(() => {
    hourlyForecast.refetch()
  }, [dateValue])

  return (
    <Stack
      style={{
        ...container,
      }}
    >
      <Title ml={10} order={2}>
        {formattedDate}
      </Title>

      <Grid>
        <WeatherCard
          isLoading={currentWeather.isLoading}
          Icon={IconTemperature}
          label="Temperature"
          value={`${currentWeather.data?.current?.temp_c || '-'}°C`}
          color="#228be6"
        />
        <WeatherCard
          isLoading={currentWeather.isLoading}
          Icon={IconRipple}
          label="Humidity"
          value={`${currentWeather.data?.current?.humidity || '-'}%`}
          color="#06b2af"
        />
        <WeatherCard
          isLoading={currentWeather.isLoading}
          Icon={IconWind}
          label="Wind speed"
          value={`${
            Math.round(currentWeather.data?.current?.wind_kph / 3.6) || '-'
          } m/s`}
          color="#ff8c00"
        />
        <WeatherCard
          isLoading={currentWeather.isLoading}
          Icon={IconCloudRain}
          label="Precipitation"
          value={`${currentWeather.data?.current?.precip_mm} mm`}
          color="#ff0000"
        />
      </Grid>

      <Stack mt={30}>
        <Group>
          <SegmentedControl
            value={timebox}
            onChange={(value) => setTimebox(value)}
            data={[
              { label: 'Weekly forecast', value: 'weekly' },
              { label: 'Hourly forecast', value: 'hourly' },
            ]}
          />
          <Space style={{ flex: 1 }} />
          <DateInput
            value={dateValue}
            onChange={setDateValue}
            placeholder="Date input"
          />
        </Group>

        {timebox === 'weekly' ? (
          <Grid mt={10}>
            <WeatherGridColWeekly
              label="Temperature (°C)"
              color="#228be6"
              data={
                weeklyForecast.data?.forecast?.forecastday?.map(
                  (day) => day.day.avgtemp_c
                ) || []
              }
            />
            <WeatherGridColWeekly
              label="Humidity (%)"
              color="#06b2af"
              data={
                weeklyForecast.data?.forecast?.forecastday?.map(
                  (day) => day.day.avghumidity
                ) || []
              }
            />
            <WeatherGridColWeekly
              label="Wind speed (m/s)"
              color="#ff8c00"
              data={
                weeklyForecast.data?.forecast?.forecastday?.map(
                  (day) => day.day.maxwind_kph / 3.6
                ) || []
              }
            />
            <WeatherGridColWeekly
              label="Precipitation (mm)"
              color="#ff0000"
              data={
                weeklyForecast.data?.forecast?.forecastday?.map(
                  (day) => day.day.totalprecip_mm
                ) || []
              }
            />
          </Grid>
        ) : (
          <Grid mt={10}>
            <WeatherGridColHourly
              label="Temperature (°C)"
              color="#228be6"
              data={
                hourlyForecast.data?.forecast?.forecastday[0]?.hour?.map(
                  (hour) => hour.temp_c
                ) || []
              }
            />
            <WeatherGridColHourly
              label="Humidity (%)"
              color="#06b2af"
              data={
                hourlyForecast.data?.forecast?.forecastday[0]?.hour?.map(
                  (hour) => hour.humidity
                ) || []
              }
            />
            <WeatherGridColHourly
              label="Wind speed (m/s)"
              color="#ff8c00"
              data={
                hourlyForecast.data?.forecast?.forecastday[0]?.hour?.map(
                  (hour) => hour.wind_kph / 3.6
                ) || []
              }
            />
            <WeatherGridColHourly
              label="Precipitation (mm)"
              color="#ff0000"
              data={
                hourlyForecast.data?.forecast?.forecastday[0]?.hour?.map(
                  (hour) => hour.precip_mm
                ) || []
              }
            />
          </Grid>
        )}
      </Stack>
    </Stack>
  )
}
