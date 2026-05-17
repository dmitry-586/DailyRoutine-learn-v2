import { queryKeys } from '@/shared/lib'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import {
  figmaApi,
  type FigmaChapterRequest,
  type FigmaSectionRequest,
} from './api'

const STALE_TIME = 1000 * 60 * 10
const GC_TIME = 1000 * 60 * 20

function handleError(error: unknown, fallbackMessage: string) {
  toast.error(error instanceof Error ? error.message : fallbackMessage)
}

function useFigmaChapters() {
  const { data, isPending, isError } = useQuery({
    queryKey: queryKeys.figma.chapters,
    queryFn: figmaApi.getChapters,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })

  return {
    chapters: data ?? [],
    isLoading: isPending,
    isError,
    isEmpty: !isPending && (data?.length ?? 0) === 0,
  }
}

function useFigmaChapterById(id: string, enabled = true) {
  const { data, isPending, isError } = useQuery({
    queryKey: queryKeys.figma.chapterById(id),
    queryFn: () => figmaApi.getChapter(id),
    enabled: enabled && Boolean(id),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })

  return {
    chapter: data,
    isLoading: isPending,
    isError,
  }
}

function useCreateFigmaChapter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: figmaApi.createChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.figma.chapters })
      toast.success('Глава Figma создана')
    },
    onError: (error) => handleError(error, 'Ошибка при создании главы'),
  })
}

function useUpdateFigmaChapter(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: FigmaChapterRequest) =>
      figmaApi.updateChapter(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.figma.chapters })
      queryClient.invalidateQueries({
        queryKey: queryKeys.figma.chapterById(id),
      })
      toast.success('Глава Figma обновлена')
    },
    onError: (error) => handleError(error, 'Ошибка при обновлении главы'),
  })
}

function useDeleteFigmaChapter() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: figmaApi.deleteChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.figma.chapters })
      toast.success('Глава Figma удалена')
    },
    onError: (error) => handleError(error, 'Ошибка при удалении главы'),
  })
}

function useCreateFigmaSection(chapterId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: figmaApi.createSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.figma.chapters })
      queryClient.invalidateQueries({
        queryKey: queryKeys.figma.chapterById(chapterId),
      })
      toast.success('Раздел Figma создан')
    },
    onError: (error) => handleError(error, 'Ошибка при создании раздела'),
  })
}

function useUpdateFigmaSection(chapterId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FigmaSectionRequest }) =>
      figmaApi.updateSection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.figma.chapters })
      queryClient.invalidateQueries({
        queryKey: queryKeys.figma.chapterById(chapterId),
      })
      toast.success('Раздел Figma обновлен')
    },
    onError: (error) => handleError(error, 'Ошибка при обновлении раздела'),
  })
}

function useDeleteFigmaSection(chapterId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: figmaApi.deleteSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.figma.chapters })
      queryClient.invalidateQueries({
        queryKey: queryKeys.figma.chapterById(chapterId),
      })
      toast.success('Раздел Figma удален')
    },
    onError: (error) => handleError(error, 'Ошибка при удалении раздела'),
  })
}

function useUploadFigmaMedia() {
  return useMutation({
    mutationFn: figmaApi.uploadMedia,
    onError: (error) => handleError(error, 'Ошибка при загрузке файла'),
  })
}

export {
  useCreateFigmaChapter,
  useCreateFigmaSection,
  useDeleteFigmaChapter,
  useDeleteFigmaSection,
  useFigmaChapterById,
  useFigmaChapters,
  useUpdateFigmaChapter,
  useUpdateFigmaSection,
  useUploadFigmaMedia,
}
