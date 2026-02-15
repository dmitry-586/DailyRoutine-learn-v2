import { api, queryKeys } from '@/shared/lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { LoginFormValues, SignUpFormValues } from './schema'

export const useAuth = () => {
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginFormValues) => {
      const response = await api.post<{ user: unknown }>('/auth/login', payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user })
      toast.success('Вход выполнен успешно!')
    },
    onError: (error: { message?: string; status?: number }) => {
      const message =
        error.message || 'Произошла ошибка при входе. Попробуйте еще раз.'
      toast.error(message)
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (data: SignUpFormValues) => {
      const { confirmPassword, ...payload } = data
      const response = await api.post<{ user: unknown }>(
        '/auth/register',
        payload,
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user })
      toast.success('Регистрация выполнена успешно!')
    },
    onError: (error: { message?: string; status?: number }) => {
      const message =
        error.message || 'Произошла ошибка при регистрации. Попробуйте еще раз.'
      toast.error(message)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout')
    },
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.user, null)
      queryClient.invalidateQueries({ queryKey: queryKeys.user })
      toast.info('Вы вышли из аккаунта')
    },
    onError: (error: { message?: string; status?: number }) => {
      const message =
        error.message || 'Произошла ошибка при выходе. Попробуйте еще раз.'
      toast.error(message)
    },
  })

  return {
    loginMutation,
    registerMutation,
    logoutMutation,
    isPending:
      loginMutation.isPending ||
      registerMutation.isPending ||
      logoutMutation.isPending,
  }
}
