import { AppShell, Burger, Group, Space, Stack, Text } from '@mantine/core'
import { readSessionStorageValue, useDisclosure } from '@mantine/hooks'
import { IconLocation } from '@tabler/icons-react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from '../../../routes/Sidebar'

export function AppLayout({
  sidebar,
  header,
}: {
  sidebar?: boolean
  header?: boolean
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
  const user: any = readSessionStorageValue({ key: 'user' })

  return (
    <AppShell
      header={header ? { height: 60 } : undefined}
      navbar={
        sidebar
          ? {
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }
          : undefined
      }
      padding="0"
    >
      {header ? (
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={false}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Space style={{ flex: 1 }} />

            <Stack gap={3} mr={7}>
              <Text style={{ fontSize: 13, lineHeight: 1 }} fw={800}>
                {user.name}
              </Text>

              <Group gap={0}>
                <Text style={{ fontSize: 13, lineHeight: 1 }}>
                  {user.location}
                </Text>
                <IconLocation strokeWidth={3} height={12} />
              </Group>
            </Stack>
          </Group>
        </AppShell.Header>
      ) : (
        ''
      )}

      {sidebar ? (
        <AppShell.Navbar p="md">
          <Sidebar />
        </AppShell.Navbar>
      ) : (
        ''
      )}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
