import { notifications } from '@mantine/notifications'

export const handleSuccess = ({
  message = 'Success!',
  autoClose = 2500,
}: {
  message?: string
  autoClose?: number
}) => {
  notifications.show({
    color: 'green',
    message,
    autoClose,
    closeButtonProps: {
      style: {
        all: 'inherit',
      },
    },
  })
}

export const handleError = ({ message = 'Error' }: { message?: string }) => {
  notifications.show({
    color: 'red',
    message,
    closeButtonProps: {
      style: {
        all: 'inherit',
      },
    },
  })
}
