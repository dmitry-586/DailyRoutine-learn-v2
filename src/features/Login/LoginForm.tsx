'use client'

import { Button, Input } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
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

const isAllowedRedirect = (path: string | null): path is string =>
  !!path &&
  path.startsWith('/') &&
  !path.startsWith('//') &&
  !path.startsWith('/login')

export function LoginForm({ isLogin }: LoginFormProps) {
  const schema = isLogin ? loginSchema : signUpSchema
  const router = useRouter()
  const from = useSearchParams().get('from')

  const { reset, handleSubmit, register, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const { loginMutation, registerMutation, isPending } = useAuth()

  const onSuccess = () => {
    reset()
    router.push(isAllowedRedirect(from) ? from : '/')
  }

  const onSubmit = handleSubmit((data) => {
    if (isLogin) {
      loginMutation.mutate(data as LoginFormValues, {
        onSuccess: onSuccess,
      })
    } else {
      registerMutation.mutate(data as SignUpFormValues, {
        onSuccess: onSuccess,
      })
    }
  })

  const visibleFields = isLogin
    ? FieldsContent.filter((f) => f.isLogin)
    : FieldsContent

  const submitButtonText = isPending
    ? isLogin
      ? 'Вход...'
      : 'Регистрация...'
    : isLogin
      ? 'Войти'
      : 'Зарегистрироваться'

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
          disabled={isPending}
          className='py-3'
        />
      ))}
      <Button className='mt-4' type='submit' disabled={isPending}>
        {submitButtonText}
      </Button>
    </form>
  )
}
