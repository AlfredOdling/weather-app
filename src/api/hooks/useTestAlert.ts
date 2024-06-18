import { useMutation } from '@tanstack/react-query'

import { Routes } from '../routes'
import { handleSuccess } from '../utils/functions'

interface TestAlertProps {
  notificationEmail
}

export const useTestAlert = () => {
  return useMutation({
    mutationFn: async ({ notificationEmail }: TestAlertProps) => {
      const response = await fetch(
        process.env.REACT_APP_BE_SERVER_URL + Routes.testAlert,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            notificationEmail,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Error')
      }
    },
    onSuccess: async () => {
      handleSuccess({ message: 'Alerts has been generated 🎉' })
    },
  })
}
