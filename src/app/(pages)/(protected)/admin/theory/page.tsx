'use client'

import { AddPartModal, PartCard, useParts } from '@/features/AdminPanel'
import { Button, HomeButton } from '@/shared/ui'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function TheoryAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { parts, isLoading, isEmpty } = useParts()

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

      <div className='sticky bottom-5 left-0 z-10 flex gap-5'>
        <HomeButton />
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
