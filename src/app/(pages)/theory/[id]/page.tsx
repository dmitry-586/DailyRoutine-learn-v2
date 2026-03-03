import { chapterApi } from '@/services/theory/api'

export default async function Theory({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const chapter = await chapterApi.getById(id)

  return (
    <div className='flex flex-1 flex-col gap-3'>
      <h1 className='text-2xl font-bold'>
        Глава: {chapter.order} - {chapter.title}
      </h1>
      <div className='flex flex-col gap-5'>
        <div className='prose max-w-none'>
          {chapter.subchapters.map((subchapter) => (
            <div key={subchapter.id}>
              <h2>{subchapter.title}</h2>
              <p>{subchapter.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
