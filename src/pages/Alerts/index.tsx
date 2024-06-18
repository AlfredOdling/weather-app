import {
  Alert,
  Button,
  Checkbox,
  Group,
  SegmentedControl,
  Stack,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useSessionStorage } from '@mantine/hooks'
import {
  IconCircle,
  IconCircleCheckFilled,
  IconDeviceFloppy,
  IconStorm,
  IconTestPipe,
} from '@tabler/icons-react'
import { useState } from 'react'
import { useSaveAlert } from 'src/api/hooks/useSaveAlert'
import { useTestAlert } from 'src/api/hooks/useTestAlert'
import { container } from 'src/shared/styles/styles'

import { FormValuesThreshold, initialValuesThreshold } from './consts'

export const Alerts = () => {
  // const [alerts, setAlerts] = useSessionStorage({
  //   key: 'alerts',
  //   defaultValue: {},
  // })
  const [timebox, setTimebox] = useState('daily')

  const saveAlert = useSaveAlert()
  const testAlert = useTestAlert()

  const form = useForm<FormValuesThreshold>({
    initialValues: initialValuesThreshold,
  })

  return (
    <Stack
      style={{
        ...container,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        style={{
          padding: '30px 40px',
          borderRadius: 10,
          width: 500,
          background: 'white',
          border: '0.5px solid #e1e1e1',
        }}
      >
        <Stack gap={'sm'}>
          <Stack>
            <Alert
              mb={10}
              variant="light"
              color="blue"
              title="Alerts & Thresholds"
              icon={<IconStorm strokeWidth={1.6} height={17} />}
              style={{
                border: '0.5px solid #e1e1e1',
                background:
                  'radial-gradient(105.1% 50% at 52.4% 100%, rgb(181 187 239 / 10%) 0%, rgb(249 251 255) 100%)',
              }}
            >
              Decide what alerts you want to receive by setting the thresholds.
            </Alert>

            <SegmentedControl
              value={timebox}
              onChange={(value) => setTimebox(value)}
              data={[
                { label: 'Daily alerts', value: 'daily' },
                { label: 'Hourly alerts', value: 'hourly' },
              ]}
            />

            <TextInput
              label="Location"
              placeholder="Stockholm"
              {...form.getInputProps('location')}
              rightSection={
                form.values.location ? (
                  <IconCircleCheckFilled
                    strokeWidth={1.6}
                    height={19}
                    style={{ color: 'black' }}
                  />
                ) : (
                  <IconCircle strokeWidth={1.6} height={19} />
                )
              }
            />

            <TextInput
              label="Storms threshold"
              placeholder="24 m/s"
              type="number"
              {...form.getInputProps('stormsThreshold')}
              rightSection={
                form.values.stormsThreshold ? (
                  <IconCircleCheckFilled
                    strokeWidth={1.6}
                    height={19}
                    style={{ color: 'black' }}
                  />
                ) : (
                  <IconCircle strokeWidth={1.6} height={19} />
                )
              }
            />

            <TextInput
              label="Hurricane threshold"
              placeholder="28 m/s"
              type="number"
              {...form.getInputProps('hurricanesThreshold')}
              rightSection={
                form.values.hurricanesThreshold ? (
                  <IconCircleCheckFilled
                    strokeWidth={1.6}
                    height={19}
                    style={{ color: 'black' }}
                  />
                ) : (
                  <IconCircle strokeWidth={1.6} height={19} />
                )
              }
            />

            <TextInput
              label="Heavy rain threshold"
              placeholder="7.6 mm/h"
              type="number"
              {...form.getInputProps('heavyRainThreshold')}
              rightSection={
                form.values.heavyRainThreshold ? (
                  <IconCircleCheckFilled
                    strokeWidth={1.6}
                    height={19}
                    style={{ color: 'black' }}
                  />
                ) : (
                  <IconCircle strokeWidth={1.6} height={19} />
                )
              }
            />

            <TextInput
              label="Extreme temperature threshold"
              placeholder="40 °C"
              type="number"
              {...form.getInputProps('extremeTemperatureThreshold')}
              rightSection={
                form.values.extremeTemperatureThreshold ? (
                  <IconCircleCheckFilled
                    strokeWidth={1.6}
                    height={19}
                    style={{ color: 'black' }}
                  />
                ) : (
                  <IconCircle strokeWidth={1.6} height={19} />
                )
              }
            />

            <TextInput
              label="Notification email"
              {...form.getInputProps('notificationEmail')}
              rightSection={
                form.values.notificationEmail ? (
                  <IconCircleCheckFilled
                    strokeWidth={1.6}
                    height={19}
                    style={{ color: 'black' }}
                  />
                ) : (
                  <IconCircle strokeWidth={1.6} height={19} />
                )
              }
            />
            <TextInput
              label="SMS number"
              {...form.getInputProps('smsNumber')}
              rightSection={
                form.values.smsNumber ? (
                  <IconCircleCheckFilled
                    strokeWidth={1.6}
                    height={19}
                    style={{ color: 'black' }}
                  />
                ) : (
                  <IconCircle strokeWidth={1.6} height={19} />
                )
              }
            />
            <Checkbox
              label="Push notifications"
              checked={form.values.pushNotifications}
              onChange={(event) =>
                form.setFieldValue(
                  'pushNotifications',
                  event.currentTarget.checked
                )
              }
            />
          </Stack>

          <Group justify="flex-end">
            <Button
              rightSection={<IconTestPipe strokeWidth={1.6} height={17} />}
              variant="light"
              onClick={() =>
                testAlert.mutate({
                  notificationEmail: form.values.notificationEmail,
                })
              }
              mt={20}
            >
              Test
            </Button>

            <Button
              rightSection={<IconDeviceFloppy strokeWidth={1.6} height={17} />}
              onClick={() => {
                // setAlerts(form.values)
                saveAlert.mutate(form.values)
              }}
              mt={20}
            >
              Save
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Stack>
  )
}
