import { chapterApi } from '@/services/theory'
import { useNumberedSubchapters } from '@/services/theory/useNumberedSubchapters'
import { ChapterContent } from '@/shared/ui'

export default async function Theory({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const chapter = await chapterApi.getById(id)

  const subchaptersWithNumber = useNumberedSubchapters(
    chapter.order,
    chapter.subchapters,
  )

  return (
    <ChapterContent
      title={`Глава: ${chapter.order} - ${chapter.title}`}
      items={subchaptersWithNumber.map((subchapter) => ({
        id: subchapter.id,
        title: subchapter.title
          ? `${subchapter.number} ${subchapter.title}`
          : undefined,
        content: subchapter.description,
      }))}
      emptyMessage='Подглавы не найдены'
    />
  )
}
