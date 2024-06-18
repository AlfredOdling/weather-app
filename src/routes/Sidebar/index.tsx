import { ScrollArea, Stack } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import {
  IconAlertTriangle,
  IconUmbrella,
} from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { paths } from '../paths'
import { MenuButtons } from './MenuButtons'
import { MenuButtonsProps } from './MenuButtons'

export function Sidebar() {
  const location = useLocation()
  const [activePath, setActivePath] = useState<any>()
  const [activeSubPath, setActiveSubPath] = useState<any>()

  // eslint-disable-next-line
  const [_] = useLocalStorage({
    key: 'showSidebar',
    defaultValue: true,
  })

  useEffect(() => {
    // Set active main path
    const activeLink = sidebarItems.find((item) =>
      location.pathname.includes(item.link)
    )
    activeLink && setActivePath(activeLink.link)

    const currentSidebarItem = sidebarItems.find(
      (item) => item.link === activeLink?.link
    )

    // Set active sub path
    if (currentSidebarItem?.links?.length) {
      const activeSubLink = currentSidebarItem.links.find((item) =>
        location.pathname.includes(item.link)
      )
      setActiveSubPath(activeSubLink?.link)
    } else {
      setActiveSubPath(undefined)
    }
  }, [location.pathname])

  const sidebarItems: MenuButtonsProps[] = [
    {
      link: paths.weather,
      label: 'Weather',
      icon: IconUmbrella,
    },
    { link: paths.alerts, label: 'Alerts', icon: IconAlertTriangle },
  ]

  return (
    <Stack
      style={{
        height: '100%',
      }}
    >
      <ScrollArea>
        {sidebarItems.map((item) => (
          <MenuButtons
            {...item}
            key={item.label}
            active={activePath}
            activeSubPath={activeSubPath}
          />
        ))}
      </ScrollArea>
    </Stack>
  )
}
