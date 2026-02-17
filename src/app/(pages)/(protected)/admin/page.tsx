'use client'

import { PartCard } from '@/features/AdminPanel'
import { useParts } from '@/services/hooks'
import { BackButton } from '@/shared/ui'

export default function AdminPage() {
  const { parts, isLoading, isEmpty } = useParts()

  return (
    <section className='flex h-full flex-1 flex-col'>
      <h2 className='text-center text-xl'>Админ панель</h2>

      <div className='mt-5 flex flex-1 flex-col'>
        {isLoading && (
          <p className='text-muted-foreground text-sm'>Загрузка разделов...</p>
        )}

        {!isLoading && isEmpty && (
          <p className='text-muted-foreground text-sm'>Разделы не найдены</p>
        )}

        {!isLoading && !isEmpty && (
          <ul className='mx-auto flex w-full max-w-3xl flex-col gap-8'>
            {parts.map((part) => (
              <PartCard
                key={part.id}
                id={part.id}
                chapters={part.chapters}
                order={part.order}
                title={part.title}
              />
            ))}
          </ul>
        )}
      </div>

      <div className='sticky bottom-5 left-0 z-10 w-fit'>
        <BackButton />
      </div>
    </section>
  )
}
