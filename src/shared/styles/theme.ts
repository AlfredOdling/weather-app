import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Notification,
  SegmentedControl,
  Stack,
  createTheme,
  rem,
} from '@mantine/core'

import classes from './Components.module.css'

export const theme = createTheme({
  fontFamily: 'Sora, sans-serif',
  headings: { fontFamily: 'Kanit' },

  defaultRadius: 'lg',
  cursorType: 'pointer',

  fontSizes: {
    xs: rem(11),
    sm: rem(14),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
  },

  breakpoints: {
    xsMobile: '30em',
    mobile: '48em',
    tablet: '64em',
    desktop: '74em',
    xlDesktop: '90em',
  },

  defaultGradient: {
    from: '#724BDB',
    to: '#9372ED',
    deg: 0,
  },

  components: {
    MenuItem: Menu.Item.extend({
      defaultProps: {
        style: {
          borderRadius: 12,
        },
      },
    }),

    SegmentedControl: SegmentedControl.extend({
      defaultProps: {
        radius: 'xl',
      },
    }),

    Group: Group.extend({
      defaultProps: {
        gap: 'xs',
      },
    }),

    Stack: Stack.extend({
      defaultProps: {
        gap: 'xs',
      },
    }),

    Notification: Notification.extend({
      defaultProps: {
        radius: 'md',
      },
    }),

    ActionIcon: ActionIcon.extend({
      defaultProps: {
        color: 'black',
      },
    }),

    Button: Button.extend({
      classNames: classes,
      defaultProps: {
        radius: 'xl',
        color: 'black',
      },
    }),
  },
})
