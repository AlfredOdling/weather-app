import { ScrollArea } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'

export const handleError = (errorMsg: string) => {
  notifications.show({
    color: 'red',
    title: `Something went wrong`,
    message: (
      <ScrollArea offsetScrollbars h={137} scrollbarSize={5}>
        {errorMsg || ''}
      </ScrollArea>
    ),
    icon: <IconX />,
    closeButtonProps: {
      style: {
        all: 'inherit',
      },
    },
  })
}
