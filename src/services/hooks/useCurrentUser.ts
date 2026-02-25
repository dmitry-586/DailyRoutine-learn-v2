import { api, queryKeys } from '@/shared/lib'
import { useQuery } from '@tanstack/react-query'
import { AuthMeResponse, User } from '../types'

const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<AuthMeResponse>('/auth/me')
    return data.user
  } catch {
    return null
  }
}

export function useCurrentUser() {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: queryKeys.user,
    queryFn: fetchCurrentUser,
    retry: false,
  })

  const isPending = isLoading || (isFetching && !user)

  return {
    user,
    isLoading: isPending,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
  }
}
