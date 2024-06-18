import {
  Box,
  Center,
  Collapse,
  Group,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import classes from './MenuButtons.module.css'

export interface MenuButtonsProps {
  icon: React.FC<any>
  label: string
  link: string
  initiallyOpened?: boolean
  links?: { label: string; link: string; icon: any }[]
  active?: string
  activeSubPath?: string
}

export function MenuButtons({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  links,
  active,
  activeSubPath,
}: MenuButtonsProps) {
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)
  const navigate = useNavigate()

  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component="a"
      className={classes.submenuItem}
      href={link.link}
      key={link.label}
      onClick={(event) => {
        navigate(link.link)
        event.preventDefault()
      }}
    >
      <Group
        gap={5}
        style={{
          padding: '10px 20px',
          fontWeight: activeSubPath === link.link ? 700 : 500,
        }}
      >
        {link.icon}
        {link.label}
      </Group>
    </Text>
  ))

  return (
    <>
      <UnstyledButton
        className={classes.menuItem}
        onClick={() => {
          setOpened((o) => !o)
          navigate(link)
        }}
      >
        <Group
          justify="space-between"
          gap={0}
          style={{
            padding: '10px 20px',
            borderRadius: 'var(--mantine-radius-xl)',
            backgroundColor:
              active === link ? 'var(--mantine-color-gray-2)' : undefined,
          }}
        >
          <Center>
            <Icon style={{ width: rem(18), height: rem(18) }} />
            <Box ml="md">
              <Text
                style={{
                  fontWeight: active === link ? 600 : 500,
                }}
              >
                {label}
              </Text>
            </Box>
          </Center>

          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}
