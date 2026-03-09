import { chapterApi } from '@/services/theory/api'
import MarkdownRenderer from '@/services/theory/MarkdownRenderer'

export default async function Theory({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const chapter = await chapterApi.getById(id)

  return (
    <div className='flex flex-1 flex-col gap-3 py-5'>
      <h1 className='text-lg font-semibold sm:text-xl lg:text-2xl'>
        Глава: {chapter.order} - {chapter.title}
      </h1>
      <div className='flex flex-col gap-5'>
        <div className='prose max-w-none'>
          {chapter.subchapters.map((subchapter) => (
            <div key={subchapter.id}>
              <h2 className='border-t border-white/60 pt-3 text-lg font-medium'>
                {subchapter.title}
              </h2>
              <MarkdownRenderer
                className='mt-3 leading-relaxed text-white/90 indent-4'
                content={subchapter.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
