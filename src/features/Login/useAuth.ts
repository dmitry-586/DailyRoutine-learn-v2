import { api } from '@/shared/lib'
import { useMutation } from '@tanstack/react-query'
import type { LoginFormValues, SignUpFormValues } from './schema'

type RegisterPayload = Omit<SignUpFormValues, 'confirmPassword'>

const useRegisterMutation = () =>
  useMutation({
    mutationFn: (data: SignUpFormValues) => {
      const { confirmPassword, ...payload } = data
      return api.post<RegisterPayload>('/auth/register', payload)
    },
  })

const useLoginMutation = () =>
  useMutation({
    mutationFn: (payload: LoginFormValues) => {
      return api.post<LoginFormValues>('/auth/login', payload)
    },
  })

export const useAuth = () => {
  const login = useLoginMutation()
  const register = useRegisterMutation()

  return {
    loginMutation: login.mutate,
    registerMutation: register.mutate,
    isPending: login.isPending || register.isPending,
  }
}
