'use client'

import { useFigmaChapterById } from '@/services/figma'
import { sortByOrder } from '@/shared/lib'
import { ChapterContent } from '@/shared/ui'
import { Loader } from '@/shared/ui/Loader'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export default function FigmaChapterPage() {
  const params = useParams<{ id: string }>()
  const id = params.id

  const {
    chapter,
    isLoading: isChapterLoading,
    isError,
  } = useFigmaChapterById(id)

  const sections = useMemo(
    () => sortByOrder(chapter?.sections ?? []),
    [chapter?.sections],
  )

  if (isChapterLoading) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (isError || !chapter) {
    return (
      <div className='flex flex-1 items-center justify-center text-sm text-white/60'>
        Глава не найдена
      </div>
    )
  }

  return (
    <ChapterContent
      title={`Глава: ${chapter.order} - ${chapter.title}`}
      items={sections.map((section) => ({
        id: section.id,
        title: section.title ? `${section.order}. ${section.title}` : undefined,
        content: section.content,
      }))}
      emptyMessage='В этой главе пока нет разделов'
    />
  )
}
