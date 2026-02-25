'use client'

import { useCurrentUser } from '@/services/hooks'
import { usePathname } from 'next/navigation'
import { useLayoutEffect, type ReactNode } from 'react'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { isAuthenticated, isAdmin, isLoading } = useCurrentUser()
  const requireAdmin = pathname.startsWith('/admin')

  useLayoutEffect(() => {
    if (isLoading) return
    if (!isAuthenticated) {
      window.location.href = `/login?from=${encodeURIComponent(pathname)}`
      return
    }
    if (requireAdmin && !isAdmin) {
      window.location.href = '/'
    }
  }, [isLoading, isAuthenticated, isAdmin, pathname, requireAdmin])

  if (isLoading || !isAuthenticated || (requireAdmin && !isAdmin)) {
    return null
  }

  return <>{children}</>
}
