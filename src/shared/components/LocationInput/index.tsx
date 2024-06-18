import { ActionIcon, Autocomplete, Stack } from '@mantine/core'
import { IconLocation } from '@tabler/icons-react'
import { useState } from 'react'

import classes from './ContainedInput.module.css'

export const LocationInput = ({
  form,
  embedTitle,
  withAsterisk = true,
}: {
  form: any
  embedTitle?: boolean
  withAsterisk?: boolean
}) => {
  const [autocompleteCities, setAutocompleteCities] = useState<any[]>([])
  const [autocompleteErr, setAutocompleteErr] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchPlace = async (text) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}&cachebuster=1625641871908&autocomplete=true&types=place`
      )
        .catch((err) => setAutocompleteErr(err))
        .finally(() => setAutocompleteErr(''))

      return await res?.json().then(
        (res) =>
          res?.features?.map((feature) => ({
            place_name: feature.place_name,
            coordinates: feature.geometry.coordinates,
          }))
      )
    } catch (err) {
      return { error: 'Unable to retrieve places' }
    }
  }

  // https://javascript.plainenglish.io/create-a-simple-city-autocomplete-field-in-react-f7675d249c74#5057
  const handleCityChange = async (value: string) => {
    form.setFieldValue('location', value)
    if (!form.values.location) return

    const places = await fetchPlace(form.values.location)

    if (!autocompleteCities.includes(form.values.location) && places) {
      setAutocompleteCities(places.map((place) => place.place_name))
    }
  }

  const getCityName = async (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const city =
          data.address.city || data.address.town || data.address.village

        // Set the city name in the form
        form.setFieldValue('location', city)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching location data:', error)
      })
  }

  const hej2 = async () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      console.log('Geolocation is not supported by this browser.')
    }

    function success(position) {
      getCityName(position)
    }

    function error() {
      console.log('Unable to retrieve your location.')
    }
  }

  return (
    <Stack gap={0}>
      <Autocomplete
        withAsterisk={withAsterisk}
        label="Location"
        placeholder={'Stockholm, Sweden'}
        onChange={handleCityChange}
        error={autocompleteErr || form.errors.location}
        data={autocompleteCities}
        value={form.values.location || ''}
        classNames={embedTitle ? classes : undefined}
        rightSection={
          <ActionIcon
            onClick={hej2}
            variant="light"
            size={'sm'}
            loading={loading}
          >
            <IconLocation strokeWidth={1.6} height={15} />
          </ActionIcon>
        }
      />
    </Stack>
  )
}
