'use client'

import { Input } from '@/shared/ui'
import { FieldsContent } from './config'

interface ILogin {
  isLogin: boolean
}

export function LoginForm({ isLogin }: ILogin) {
  return (
    <form className='flex w-full flex-col' onSubmit={(e) => e.preventDefault()}>
      {FieldsContent.filter((field) => {
        return !isLogin ? field : field.isLogin === isLogin
      }).map((field) => (
        <Input
          key={field.name}
          name={field.name}
          type={field.type}
          label={field.label}
          leftIcon={field.leftIcon}
        />
      ))}
    </form>
  )
}
