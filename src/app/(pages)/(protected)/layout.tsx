'use client'

import { useCurrentUser } from '@/features/Header'
import { usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { isAuthenticated, isAdmin, isLoading } = useCurrentUser()
  const requireAdmin = pathname.startsWith('/admin')

  useEffect(() => {
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
