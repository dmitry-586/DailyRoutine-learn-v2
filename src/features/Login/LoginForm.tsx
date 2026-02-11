'use client'

import { Button, Input } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FieldsContent } from './config'
import {
  loginSchema,
  signUpSchema,
  type LoginFormValues,
  type SignUpFormValues,
} from './schema'

interface LoginFormProps {
  isLogin: boolean
}

type FormValues = LoginFormValues | SignUpFormValues

export function LoginForm({ isLogin }: LoginFormProps) {
  const schema = isLogin ? loginSchema : signUpSchema

  const { reset, handleSubmit, register, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
    reset()
  }

  const visibleFields = isLogin
    ? FieldsContent.filter((f) => f.isLogin)
    : FieldsContent

  return (
    <form className='flex w-full flex-col' onSubmit={handleSubmit(onSubmit)}>
      {visibleFields.map((field) => (
        <Input
          key={field.name}
          {...register(field.name)}
          name={field.name}
          type={field.type}
          label={field.label}
          leftIcon={field.leftIcon}
          error={formState.errors[field.name as keyof FormValues]?.message}
        />
      ))}
      <Button className='mt-4' type='submit'>
        {isLogin ? 'Войти' : 'Зарегистрироваться'}
      </Button>
    </form>
  )
}
