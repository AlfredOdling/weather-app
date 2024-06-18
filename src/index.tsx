import '@fontsource/kanit'
import '@fontsource/sora'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App, queryClient } from './App'
import reportWebVitals from './reportWebVitals'
import './shared/styles/global.css'
import { theme } from './shared/styles/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        <App />
      </MantineProvider>

      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
