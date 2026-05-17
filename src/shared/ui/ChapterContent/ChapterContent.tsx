import { MarkdownRenderer } from '../MarkdownRenderer'

interface ChapterContentItem {
  id: string
  title?: string
  content: string
}

interface ChapterContentProps {
  title: string
  items: ChapterContentItem[]
  emptyMessage?: string
}

export function ChapterContent({
  title,
  items,
  emptyMessage = 'Разделы не найдены',
}: ChapterContentProps) {
  return (
    <div className='flex w-full max-w-4xl flex-1 flex-col gap-3 py-5 sm:mx-auto'>
      <h1 className='text-lg font-semibold sm:text-xl lg:text-2xl'>{title}</h1>

      {items.length === 0 ? (
        <div className='flex min-h-40 items-center justify-center text-center text-sm text-white/60'>
          {emptyMessage}
        </div>
      ) : (
        <div className='flex flex-col gap-5'>
          <div className='prose max-w-none'>
            {items.map((item) => (
              <div key={item.id}>
                {item.title && (
                  <h2 className='border-t border-white/60 pt-3 text-lg font-medium'>
                    {item.title}
                  </h2>
                )}
                <MarkdownRenderer
                  className='mt-3 leading-relaxed text-white/90'
                  content={item.content}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
