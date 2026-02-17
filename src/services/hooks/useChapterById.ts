import { queryKeys } from '@/shared/lib'
import { useQuery } from '@tanstack/react-query'
import { fetchChapterById } from '../queries'
import { Chapter, Subchapter } from '../types'

export interface ChapterWithSubchapters extends Chapter {
  partId: string
  subchapters: Subchapter[]
}

interface ChapterByIdResult {
  chapter?: ChapterWithSubchapters
  isLoading: boolean
}

export function useChapterById(id: string): ChapterByIdResult {
  const {
    data: chapter,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: queryKeys.chapter(id),
    queryFn: () => fetchChapterById(id),
  })

  const isPending = isLoading || (isFetching && !chapter)

  return {
    chapter,
    isLoading: isPending,
  }
}
