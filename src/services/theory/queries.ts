import { queryKeys } from '@/shared/lib'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { chapterApi, partApi, subchapterApi } from '../../services/theory/api'

const STALE_TIME = 1000 * 60 * 10
const GC_TIME = 1000 * 60 * 20

function handleError(error: unknown, fallbackMessage: string) {
  toast.error(error instanceof Error ? error.message : fallbackMessage)
}

/* ========================= PART ========================= */

function useParts() {
  const { data, isPending } = useQuery({
    queryKey: queryKeys.part,
    queryFn: partApi.getAll,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })

  return {
    parts: data ?? [],
    isLoading: isPending,
    isEmpty: !isPending && (data?.length ?? 0) === 0,
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
    onError: (error) => handleError(error, 'Ошибка при создании части'),
  })
}

function useDeletePart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: partApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.part })
      queryClient.invalidateQueries({
        queryKey: queryKeys.chapter.all,
      })
      toast.success('Часть удалена')
    },
    onError: (error) => handleError(error, 'Ошибка при удалении части'),
  })
}

/* ======================== CHAPTER ======================= */

function useChapters() {
  const { data, isPending } = useQuery({
    queryKey: queryKeys.chapter.all,
    queryFn: chapterApi.getAll,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })

  return {
    chapters: data ?? [],
    isLoading: isPending,
    isEmpty: !isPending && (data?.length ?? 0) === 0,
  }
}

function useChapterMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: chapterApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.part })
      queryClient.invalidateQueries({
        queryKey: queryKeys.chapter.all,
      })
      toast.success('Новая глава создана')
    },
    onError: (error) => handleError(error, 'Ошибка при создании главы'),
  })
}

function useDeleteChapter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: chapterApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.part })
      queryClient.invalidateQueries({
        queryKey: queryKeys.chapter.all,
      })
      toast.success('Глава удалена')
    },
    onError: (error) => handleError(error, 'Ошибка при удалении главы'),
  })
}

/* ===================== SUBCHAPTER ======================= */

function useSubchapterMutation(chapterId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: subchapterApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.chapter.all,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.chapter.byId(chapterId),
      })
      toast.success('Новая подглава создана')
    },
    onError: (error) => handleError(error, 'Ошибка при создании подглавы'),
  })
}

function useDeleteSubchapter(chapterId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: subchapterApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.chapter.all,
      })
      queryClient.invalidateQueries({
        queryKey: queryKeys.chapter.byId(chapterId),
      })
      toast.success('Подглава удалена')
    },
    onError: (error) => handleError(error, 'Ошибка при удалении подглавы'),
  })
}

export {
  useChapterMutation,
  useChapters,
  useDeleteChapter,
  useDeletePart,
  useDeleteSubchapter,
  usePartMutation,
  useParts,
  useSubchapterMutation,
}
