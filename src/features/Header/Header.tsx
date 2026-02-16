'use client'

import { useCurrentUser } from '@/services/hooks'
import { usePathname } from 'next/navigation'
import { AuthButton } from './components/AuthButton'
import { BurgerButton } from './components/BurgerButton'

export function Header() {
  const pathname = usePathname()
  const { user, isLoading } = useCurrentUser()
  const displayEmail = isLoading
    ? 'Загрузка...'
    : user?.email || 'Не авторизован'

  return (
    <header className='sticky top-0 z-10 flex items-center justify-between pt-5'>
      {pathname === '/theory' && <BurgerButton />}
      <div className='ml-auto flex items-center gap-2'>
        <p>{displayEmail}</p>
        <AuthButton />
      </div>
    </header>
  )
}
