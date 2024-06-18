import { createBrowserRouter } from 'react-router-dom'
import { Alerts } from 'src/pages/Alerts'
import { Enter } from 'src/pages/Enter'
import { Weather } from 'src/pages/Weather'
import { AppLayout } from 'src/shared/components/AppLayout'

import { paths } from './paths'

export const router = createBrowserRouter([
  // Routes without sidebar and header
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Enter />,
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout sidebar header />,
    children: [
      {
        path: paths.weather,
        element: <Weather />,
      },
      {
        path: paths.alerts,
        element: <Alerts />,
      },
    ],
  },
])

// Alerts
