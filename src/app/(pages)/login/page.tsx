'use client'

import { LoginForm } from '@/features/Login'
import { useAuthStore } from '@/services/stores'
import { Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const isLogin = useAuthStore((state) => state.isLogin)
  const isLoading = useAuthStore((state) => state.isLoading)
  const setIsLogin = useAuthStore((state) => state.setIsLogin)

  return (
    <section className='mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-5'>
      {!isLoading ? (
        <>
          <div className='flex w-full items-center justify-between'>
            <h1 className='text-xl text-white'>
              {isLogin ? 'Вход' : 'Регистрация'}
            </h1>
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
