'use client'

import { usePathname } from 'next/navigation'
import { BackButton } from './BackButton'

export function Footer() {
  const pathname = usePathname()

  return (
    <footer className='sticky bottom-0 z-10 flex items-center justify-between py-5'>
      {pathname === '/' || <BackButton />}
    </footer>
  )
}
