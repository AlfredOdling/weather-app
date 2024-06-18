import {
  Button,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useSessionStorage } from '@mantine/hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { paths } from 'src/routes/paths'
import { LocationInput } from 'src/shared/components/LocationInput'
import { container } from 'src/shared/styles/styles'

import { FormValuesUser, initialValuesUser } from './consts'

export const Enter = () => {
  const navigate = useNavigate()

  const [user, setUser] = useSessionStorage({
    key: 'user',
    defaultValue: {},
  })

  const form = useForm<FormValuesUser>({
    initialValues: initialValuesUser,
    validate: {
      name: isNotEmpty('Name is required'),
      location: isNotEmpty('Location is required'),
    },
  })

  // useEffect(() => {
  //   form.setValues(user)
  // }, [user])

  return (
    <Stack
      style={{
        ...container,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Title>WeatherNow</Title>

      <Stack
        style={{
          marginTop: 20,
          padding: '30px 40px',
          borderRadius: 10,
          width: 400,
          background: 'white',
          border: '0.5px solid #e1e1e1',
        }}
      >
        <Stack gap={'sm'}>
          <TextInput
            label="Full name"
            placeholder="Johan Andersson"
            {...form.getInputProps('name')}
          />
          <LocationInput withAsterisk={false} form={form} />

          <Stack gap={0}>
            <Text>Temperature unit</Text>
            <SegmentedControl
              value={form.values.temperatureUnit}
              onChange={(value) => form.setFieldValue('temperatureUnit', value)}
              data={[
                { label: 'Celcius', value: 'celcius' },
                { label: 'Fahrenheit', value: 'fahrenheit' },
              ]}
            />
          </Stack>
        </Stack>

        <Button
          onClick={() => {
            setUser(form.values)
            navigate(paths.weather)
          }}
          disabled={!form.values.name && !form.values.location}
          mt={20}
        >
          Continue
        </Button>
      </Stack>
    </Stack>
  )
}
