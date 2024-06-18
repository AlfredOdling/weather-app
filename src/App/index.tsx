import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import { router } from '../routes'
import { handleError } from './utils'

export const App = () => {
  return <RouterProvider router={router} />
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query: any) => {
      if (error) handleError(query?.state?.error?.message)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error) handleError(JSON.stringify(error))
    },
  }),
})

export type QueryClientType = typeof queryClient
