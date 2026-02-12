'use client'

import { shouldRetry } from '@/shared/lib/query-client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useState } from 'react'

interface QueryProviderProps {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
            retry: shouldRetry,
            retryDelay: (attemptIndex) =>
              Math.min(1000 * Math.pow(2, attemptIndex), 30000),
          },
          mutations: {
            retry: shouldRetry,
            retryDelay: (attemptIndex) =>
              Math.min(1000 * Math.pow(2, attemptIndex), 30000),
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
