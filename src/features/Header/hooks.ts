import { queryKeys } from '@/shared/lib'
import { useQuery } from '@tanstack/react-query'
import { fetchCurrentUser } from './queries'

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
