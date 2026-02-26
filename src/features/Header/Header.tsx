'use client'

import { useCurrentUser } from '@/services/hooks'
import { AuthButton } from './components/AuthButton'

export function Header() {
  const { user, isLoading } = useCurrentUser()
  const displayEmail = isLoading
    ? 'Загрузка...'
    : user?.email || 'Не авторизован'

  return (
    <header className='flex items-center justify-between pt-5'>
      <div className='ml-auto flex items-center gap-2'>
        <p className='text-sm sm:text-base'>{displayEmail}</p>
        <AuthButton />
      </div>
    </header>
  )
}
