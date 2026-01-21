'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type ReactNode, useState } from 'react'

interface QueryProviderProps {
  children: ReactNode
}

function shouldRetry(failureCount: number, error: unknown): boolean {
  // Делаем максимум 2 попытки для сетевых сбоев и 500-х ошибок
  if (failureCount >= 2) {
    return false
  }

  // Проверяем, является ли ошибка объектом с полем status
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status

    if (status === 404 || status === 401) {
      return false
    }

    if (status >= 500) {
      return true
    }
  }

  // Повторяем для сетевых ошибок (когда нет статуса)
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  ) {
    const message = (error as { message: string }).message
    if (message.includes('Network Error') || message.includes('timeout')) {
      return true
    }
  }

  return false
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
