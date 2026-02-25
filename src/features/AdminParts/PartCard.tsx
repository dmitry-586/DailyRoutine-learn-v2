'use client'

import { Part } from '@/services'
import { Button } from '@/shared/ui'
import { useState } from 'react'
import { AddChapterModal, ChapterCard } from './Chapters'
import { useDeletePart } from './queries'
import { EntityInputs } from './ui'

interface PartCardProps extends Part {
  chaptersCount: number
}

export function PartCard({
  chapters,
  title,
  order,
  id,
  chaptersCount,
}: PartCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const deletePart = useDeletePart()

  return (
    <div className='bg-gray/40 hover:border-primary/50 flex flex-col rounded-2xl border border-white/10 px-4 py-6 shadow-sm transition-all duration-300 hover:shadow-lg'>
      <EntityInputs
        order={order}
        title={title}
        orderLabel='Номер части'
        titleLabel='Название части'
      />

      <div className='mt-3 flex flex-col border-t pt-5'>
        {chapters.map((chapter, index) => (
          <ChapterCard
            key={chapter.id}
            id={chapter.id}
            order={chapter.order}
            title={chapter.title}
            isFirst={index === 0}
          />
        ))}
      </div>

      <div className='mt-3 flex justify-between'>
        <Button
          onClick={() => deletePart.mutate(id)}
          className='border-red-500/80 text-red-500/80 hover:bg-red-500/10 active:bg-red-500/20'
        >
          Удалить всю часть
        </Button>

        <div className='flex gap-5'>
          <Button onClick={() => setIsOpen(true)}>Добавить главу</Button>
          <Button variant='default'>Сохранить</Button>
        </div>
      </div>

      <AddChapterModal
        partId={id}
        isOpen={isOpen}
        minOrder={chaptersCount + 1}
        maxOrder={chaptersCount + chapters.length + 1}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  )
}
