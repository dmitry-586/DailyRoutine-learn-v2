'use client'

import { LoginForm } from '@/features/Login'
import { useAuthStore } from '@/services/stores'
import { ChevronLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const isLogin = useAuthStore((state) => state.isLogin)
  const isLoading = useAuthStore((state) => state.isLoading)
  const setIsLogin = useAuthStore((state) => state.setIsLogin)

  return (
    <section className='mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-5'>
      {!isLoading ? (
        <>
          <div className='flex w-full items-end justify-between'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-xl'>
                {isLogin ? 'Вход' : 'Регистрация'}
              </h2>
              <Link
                href='/'
                className='hover:text-primary flex items-center gap-1 text-sm transition-colors duration-200'
              >
                <ChevronLeft className='size-4' />
                <p>На главную</p>
              </Link>
            </div>
            <div className='flex gap-2'>
              <p>{isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}</p>
              <button
                type='button'
                onClick={setIsLogin}
                className='text-primary cursor-pointer'
              >
                {isLogin ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </div>
          </div>
          <LoginForm key={isLogin ? 'login' : 'signup'} isLogin={isLogin} />
        </>
      ) : (
        <Loader2 className='text-primary mx-auto size-8 animate-spin' />
      )}
    </section>
  )
}
