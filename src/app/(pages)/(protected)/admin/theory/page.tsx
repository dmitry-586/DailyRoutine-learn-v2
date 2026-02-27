'use client'

import { AddPartModal, PartCard } from '@/features/AdminParts'
import { Part } from '@/services'
import { useParts } from '@/services/theory'
import { Button, HomeButton } from '@/shared/ui'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function TheoryAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { parts, isLoading, isEmpty } = useParts()

  const partsWithChaptersCount = useMemo(() => {
    return parts.reduce(
      (acc: { part: Part; chaptersCount: number }[], part, index) => {
        const previousTotal =
          index === 0
            ? 0
            : acc[index - 1].chaptersCount + parts[index - 1].chapters.length

        acc.push({ part, chaptersCount: previousTotal })
        return acc
      },
      [],
    )
  }, [parts])

  return (
    <section className='flex h-full flex-1 flex-col'>
      <div className='mt-5 flex flex-1 flex-col'>
        {isLoading && (
          <Loader2 className='text-primary mx-auto mt-10 animate-spin' />
        )}

        {!isLoading && isEmpty && (
          <p className='text-primary mx-auto text-sm'>Разделы не найдены</p>
        )}

        {!isLoading && !isEmpty && (
          <ul className='mx-auto flex w-full max-w-3xl flex-col gap-4 sm:gap-8'>
            {partsWithChaptersCount.map(({ part, chaptersCount }) => (
              <PartCard
                key={part.id}
                part={part}
                chaptersCount={chaptersCount}
              />
            ))}
          </ul>
        )}
      </div>

      <div className='sticky bottom-5 left-0 z-10 flex gap-5'>
        <HomeButton className='max-sm:p-2' />
        <Button onClick={() => setIsModalOpen(true)} variant='default'>
          Добавить часть
        </Button>
      </div>

      <AddPartModal
        isOpen={isModalOpen}
        partsCount={parts.length}
        handleClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}
