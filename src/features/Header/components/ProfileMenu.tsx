import { useAuth } from '@/features/Login'
import { cn } from '@/shared/lib'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '../hooks'
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
    <nav className='rounded-2xl border border-white/20 bg-white/10 shadow-sm'>
      <nav className='flex flex-col gap-3 px-4 py-2 text-sm'>
        {filteredMenu.map((el) => {
          return (
            <Link
              className='hover:text-primary transition-colors duration-200'
              key={el.id}
              href={el.href}
            >
              {el.title}
            </Link>
          )
        })}
        <button
          onClick={
            isAuthenticated
              ? () => logoutMutation.mutate(undefined)
              : () => router.push('/login')
          }
          disabled={logoutMutation.isPending}
          className={cn(
            'cursor-pointer border-white/60 transition-opacity',
            isAuthenticated ? 'border-t pt-2 text-red-500' : 'text-primary',
            logoutMutation.isPending && 'cursor-not-allowed opacity-50',
          )}
        >
          {logoutMutation.isPending
            ? 'Выход...'
            : isAuthenticated
              ? 'Выйти'
              : 'Войти'}
        </button>
      </nav>
    </nav>
  )
}
