'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

const Provider = ({ children }: { children: ReactNode }) => {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  )
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default Provider
