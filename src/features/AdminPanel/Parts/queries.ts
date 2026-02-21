import { queryKeys } from '@/shared/lib'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { partApi } from './api'

function useParts() {
  const query = useQuery({
    queryKey: queryKeys.part,
    queryFn: partApi.getAll,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 20,
  })

  return {
    parts: query.data ?? [],
    isLoading: query.isPending,
    isEmpty: !query.isPending && (query.data?.length ?? 0) === 0,
  }
}

function usePartMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: partApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.part })
      toast.success('Новая часть создана')
    },

    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : 'Ошибка при создании части',
      )
    },
  })
}

function useDeletePart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: partApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.part })
      queryClient.invalidateQueries({ queryKey: queryKeys.chapter.all })
      toast.success('Часть удалена')
    },
    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : 'Ошибка при удалении части',
      )
    },
  })
}

export { useDeletePart, usePartMutation, useParts }
