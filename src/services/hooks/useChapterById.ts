import { api, queryKeys } from '@/shared/lib'
import { useQuery } from '@tanstack/react-query'
import { ChapterWithSubchapters } from '../types'

interface ChapterByIdResult {
  chapter?: ChapterWithSubchapters
  isLoading: boolean
}

const fetchChapterById = async (
  id: string,
): Promise<ChapterWithSubchapters> => {
  const { data } = await api.get<ChapterWithSubchapters>(`/chapter/${id}`)

  return data
}

export function useChapterById(
  id: string,
  enabled: boolean,
): ChapterByIdResult {
  const {
    data: chapter,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: queryKeys.chapter.byId(id),
    queryFn: () => fetchChapterById(id),
    enabled,
  })

  const isPending = isLoading || (isFetching && !chapter)

  return {
    chapter,
    isLoading: isPending,
  }
}
