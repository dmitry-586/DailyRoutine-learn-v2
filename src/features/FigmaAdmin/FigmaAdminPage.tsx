'use client'

import { useFigmaChapters } from '@/services/figma'
import { sortByOrder } from '@/shared/lib'
import { Button, HomeButton } from '@/shared/ui'
import { Loader } from '@/shared/ui/Loader'
import { useMemo, useState } from 'react'
import { ChapterRow, CreateChapterModal } from './components'

export function FigmaAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { chapters, isLoading, isEmpty } = useFigmaChapters()

  const sortedChapters = useMemo(() => sortByOrder(chapters), [chapters])
  const nextOrder = (sortedChapters.at(-1)?.order ?? 0) + 1

  return (
    <section className='flex h-full flex-1 flex-col pb-5'>
      <div className='mt-5 flex flex-1 flex-col'>
        {isLoading && <Loader />}

        {!isLoading && isEmpty && (
          <p className='text-primary mx-auto text-sm'>Главы не найдены</p>
        )}

        {!isLoading && !isEmpty && (
          <ul className='mx-auto flex w-full max-w-3xl flex-col gap-4 sm:gap-8'>
            {sortedChapters.map((chapter) => (
              <ChapterRow
                key={chapter.id}
                chapter={chapter}
                maxOrder={sortedChapters.length}
              />
            ))}
          </ul>
        )}
      </div>

      <div className='sticky bottom-5 left-0 z-10 inline-flex w-fit gap-5'>
        <HomeButton className='size-11 p-2.5' />
        <Button onClick={() => setIsModalOpen(true)} variant='default'>
          Добавить главу
        </Button>
      </div>

      <CreateChapterModal
        isOpen={isModalOpen}
        nextOrder={nextOrder}
        handleClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}
