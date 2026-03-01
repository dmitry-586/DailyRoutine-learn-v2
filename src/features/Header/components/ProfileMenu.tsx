import { useAuth } from '@/features/Login'
import { useCurrentUser } from '@/services/hooks'
import { cn } from '@/shared/lib'
import { CloseButton } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { navMenu } from './config'

export function ProfileMenu() {
  const router = useRouter()
  const { isAuthenticated, isAdmin } = useCurrentUser()
  const { logoutMutation } = useAuth()

  const filteredMenu = isAuthenticated
    ? isAdmin
      ? navMenu
      : navMenu.filter((el) => !el.isAdmin)
    : []

  return (
    <nav className='bg-gray rounded-2xl'>
      <nav className='flex flex-col gap-3 px-4 py-2 text-sm'>
        {filteredMenu.map((el) => {
          return (
            <Link key={el.id} href={el.href}>
              <CloseButton className='hover:text-primary cursor-pointer transition-colors duration-200'>
                {el.title}
              </CloseButton>
            </Link>
          )
        })}
        <CloseButton
          onClick={
            isAuthenticated
              ? () => logoutMutation.mutate(undefined)
              : () => router.push('/login')
          }
          disabled={logoutMutation.isPending}
          className={cn(
            'cursor-pointer border-white/60 transition-all duration-200',
            isAuthenticated
              ? 'border-t pt-2 text-red-500/90 hover:text-red-600'
              : 'text-primary hover:text-primary/80',
            logoutMutation.isPending && 'cursor-not-allowed opacity-50',
          )}
        >
          {logoutMutation.isPending
            ? 'Выход...'
            : isAuthenticated
              ? 'Выйти'
              : 'Войти'}
        </CloseButton>
      </nav>
    </nav>
  )
}
