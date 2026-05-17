import { figmaApi } from '@/services/figma'
import type { ApiError } from '@/shared/types/api'
import { ChapterContent } from '@/shared/ui'

export default async function FigmaChapterPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const chapter = await figmaApi.getChapter(id).catch((error) => {
    if ((error as ApiError).status === 404) return null
    throw error
  })

  if (!chapter) {
    return (
      <div className='flex flex-1 items-center justify-center text-sm text-white/60'>
        Глава не найдена
      </div>
    )
  }

  return (
    <ChapterContent
      title={`Глава: ${chapter.order} - ${chapter.title}`}
      items={chapter.sections.map((section) => ({
        id: section.id,
        title: section.title ? `${section.order}. ${section.title}` : undefined,
        content: section.content,
      }))}
      emptyMessage='В этой главе пока нет разделов'
    />
  )
}
