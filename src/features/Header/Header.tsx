'use client'

import { usePathname } from 'next/navigation'
import { AuthButton } from './AuthButton'
import { BurgerButton } from './BurgerButton'

export function Header() {
  const pathname = usePathname()

  return (
    <header className='sticky top-0 z-10 flex items-center justify-between py-5'>
      {pathname === '/theory' && <BurgerButton />}
      <div className='ml-auto'>
        <AuthButton />
      </div>
    </header>
  )
}
