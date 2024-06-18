import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'src/App'
import { FormValuesThreshold } from 'src/pages/Alerts/consts'

import { Routes } from '../routes'
import { handleSuccess } from '../utils/functions'

export const useSaveAlert = () => {
  return useMutation({
    mutationFn: async ({
      extremeTemperatureThreshold,
      heavyRainThreshold,
      hurricanesThreshold,
      notificationEmail,
      pushNotifications,
      smsNumber,
      stormsThreshold,
      location,
    }: FormValuesThreshold) => {
      const response = await fetch(
        process.env.REACT_APP_BE_SERVER_URL + Routes.saveAlert,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            extremeTemperatureThreshold,
            heavyRainThreshold,
            hurricanesThreshold,
            notificationEmail,
            pushNotifications,
            smsNumber,
            stormsThreshold,
            location,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Error')
      }
    },
    onSuccess: async () => {
      handleSuccess({ message: 'Alerts has been saved! 🎉' })

      await queryClient.invalidateQueries({
        queryKey: ['save-alert'],
        type: 'all',
      })
    },
  })
}
