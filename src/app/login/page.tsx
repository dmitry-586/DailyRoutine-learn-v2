'use client'

import RegisterForm from '@/features/SignUp/RegisterForm'
import { Button } from '@/shared/ui'
import { useState } from 'react'

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <section className='mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-5'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-xl text-white'>
          {isLogin ? 'Вход' : 'Регистрация'}
        </h1>
        <div className='flex gap-2'>
          <p>{isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}</p>
          <button
            onClick={() => {
              setIsLogin((prev) => !prev)
            }}
            className='text-primary cursor-pointer'
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>
      <RegisterForm />
      <Button type='submit'>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
    </section>
  )
}
