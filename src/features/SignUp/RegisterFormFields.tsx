'use client'

import { Input } from '@/shared/ui'
import { Mail, SquareAsterisk, User } from 'lucide-react'

interface RegisterFormFieldsProps {
  formData: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
  errors: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
  onChange: (field: string, value: string) => void
}

export default function RegisterFormFields({
  formData,
  errors,
  onChange
}: RegisterFormFieldsProps) {
  return (
    <div className=" flex flex-col gap-2 mt-5">
      <Input
        leftIcon={User}
        label="Имя"
        value={formData.name}
        onChange={(e) => onChange('name', e.target.value)}
        error={errors.name}
      />
      
      <Input
        leftIcon={Mail}
        type="email"
        label="Email"
        value={formData.email}
        onChange={(e) => onChange('email', e.target.value)}
        error={errors.email}
      />
      
      <Input
        leftIcon={SquareAsterisk}
        type="password"
        label="Пароль"
        value={formData.password}
        onChange={(e) => onChange('password', e.target.value)}
        error={errors.password}
      />
      
      <Input
        leftIcon={SquareAsterisk}
        type="password"
        label="Подтвердите пароль"
        value={formData.confirmPassword}
        onChange={(e) => onChange('confirmPassword', e.target.value)}
        error={errors.confirmPassword}
      />
    </div>
  )
}