'use client'

import { Input } from '@/shared/ui'
import { Lock, Mail, User, type LucideIcon } from 'lucide-react'

export interface IFieldsContent {
  name: string
  label: string
  type: 'text' | 'email' | 'password'
  leftIcon: LucideIcon
}

export const FieldsContent: IFieldsContent[] = [
  { name: 'name', label: 'Имя', type: 'text', leftIcon: User },
  { name: 'email', label: 'Email', type: 'email', leftIcon: Mail },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    leftIcon: Lock,
  },
  {
    name: 'confirmPassword',
    label: 'Подтвердите пароль',
    type: 'password',
    leftIcon: Lock,
  },
]

export default function RegisterForm() {
  return (
    <form className='flex w-full flex-col' onSubmit={(e) => e.preventDefault()}>
      {FieldsContent.map((field) => (
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
