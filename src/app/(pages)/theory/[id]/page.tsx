import { chapterApi, MarkdownRenderer } from '@/services/theory'
import { useNumberedSubchapters } from '@/services/theory/useNumberedSubchapters'

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
    <div className='flex max-w-4xl flex-1 flex-col gap-3 py-5 sm:mx-auto'>
      <h1 className='text-lg font-semibold sm:text-xl lg:text-2xl'>
        Глава: {chapter.order} - {chapter.title}
      </h1>
      <div className='flex flex-col gap-5'>
        <div className='prose max-w-none'>
          {subchaptersWithNumber.map((subchapter) => (
            <div key={subchapter.id}>
              <h2 className='border-t border-white/60 pt-3 text-lg font-medium'>
                {subchapter.title && subchapter.number} {subchapter.title}
              </h2>
              <MarkdownRenderer
                className='mt-3 leading-relaxed text-white/90'
                content={subchapter.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
