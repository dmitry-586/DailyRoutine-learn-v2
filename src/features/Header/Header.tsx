'use client'

import { api } from '@/shared/lib'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { AuthButton } from './AuthButton'
import { BurgerButton } from './BurgerButton'

interface IUser {
  id: string
  email: string
  role: string
}

type IQuery = {
  user: IUser
}

export function Header() {
  const pathname = usePathname()

  const user = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const data = await api.get<IQuery>('/auth/me')
      return data.data.user
    },
  })

  return (
    <header className='sticky top-0 z-10 flex items-center justify-between pt-5'>
      {pathname === '/theory' && <BurgerButton />}
      <div className='ml-auto flex items-center gap-2'>
        <p>{user.data?.email || 'unknown'}</p>
        <AuthButton />
      </div>
    </header>
  )
}
