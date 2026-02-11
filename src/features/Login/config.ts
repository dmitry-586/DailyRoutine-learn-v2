import { Lock, LucideIcon, Mail, User } from 'lucide-react'

export type LoginFieldName = 'name' | 'email' | 'password' | 'confirmPassword'

export interface IFieldContent {
  name: LoginFieldName
  label: string
  type: 'text' | 'email' | 'password'
  leftIcon: LucideIcon
  isLogin: boolean
}

export const FieldsContent: IFieldContent[] = [
  { name: 'name', label: 'Имя', type: 'text', leftIcon: User, isLogin: false },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    leftIcon: Mail,
    isLogin: true,
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    leftIcon: Lock,
    isLogin: true,
  },
  {
    name: 'confirmPassword',
    label: 'Подтвердите пароль',
    type: 'password',
    leftIcon: Lock,
    isLogin: false,
  },
]
