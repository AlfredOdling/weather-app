import {
  Grid,
  GridProps,
  Group,
  GroupProps,
  ScrollArea,
  Stack,
  StackProps,
} from '@mantine/core'

import { container } from '../../styles/styles'
import './styles.css'

export const PageWrapper = ({
  type,
  children,
  stackProps,
  groupProps,
  gridProps,
}: {
  type: 'grid' | 'stack' | 'group'
  stackProps?: StackProps
  groupProps?: GroupProps
  gridProps?: GridProps
  children: React.ReactNode
}) => {
  if (type === 'stack')
    return (
      <Stack
        {...stackProps}
        style={{
          ...container,
          position: 'relative',
        }}
      >
        {children}
      </Stack>
    )

  if (type === 'group')
    return (
      <ScrollArea style={{ width: '100%' }}>
        <Group
          {...groupProps}
          style={{
            ...container,
          }}
        >
          {children}
        </Group>
      </ScrollArea>
    )

  if (type === 'grid')
    return (
      <ScrollArea style={{ width: '100%' }}>
        <Grid
          {...gridProps}
          style={{
            ...container,
          }}
        >
          {children}
        </Grid>
      </ScrollArea>
    )
}
