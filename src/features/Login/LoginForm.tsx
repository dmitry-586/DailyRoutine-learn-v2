'use client'

import { Button, Input } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FieldsContent } from './config'
import {
  loginSchema,
  signUpSchema,
  type LoginFormValues,
  type SignUpFormValues,
} from './schema'
import { useAuth } from './useAuth'

interface LoginFormProps {
  isLogin: boolean
}

export type FormValues = LoginFormValues | SignUpFormValues

export function LoginForm({ isLogin }: LoginFormProps) {
  const schema = isLogin ? loginSchema : signUpSchema

  const queryClient = useQueryClient()

  const { reset, handleSubmit, register, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const { loginMutation, registerMutation } = useAuth()

  const onSubmit = handleSubmit((data) => {
    if (isLogin) {
      loginMutation(data as LoginFormValues, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['user'] })
          toast.success('Вход успешен!')
        },
      })
    } else {
      registerMutation(data as SignUpFormValues, {
        onSuccess: () => {
          toast.success('Регистрация успешна!')
        },
      })
    }
    reset()
  })

  const visibleFields = isLogin
    ? FieldsContent.filter((f) => f.isLogin)
    : FieldsContent

  return (
    <form className='flex w-full flex-col' onSubmit={onSubmit}>
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
