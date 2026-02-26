'use client'

import { Part } from '@/services'
import { useWindowWidth } from '@/services/hooks'
import { useDeletePart } from '@/services/theory'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AddChapterModal, ChapterCard } from './Chapters'
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

  const isMobile = useWindowWidth() <= 640

  return (
    <div className='sm:bg-gray/40 sm:hover:border-primary/50 flex flex-col border-t py-6 transition-all duration-300 sm:rounded-2xl sm:border sm:border-white/10 sm:px-4 sm:shadow-sm sm:hover:shadow-lg'>
      <EntityInputs
        order={order}
        title={title}
        orderLabel={isMobile ? 'Номер' : 'Номер части'}
        titleLabel='Название части'
      />

      <div className='mt-3 flex flex-col border-t border-white/10 pt-5'>
        {chapters.map((chapter, index) => (
          <ChapterCard
            key={chapter.id}
            id={chapter.id}
            order={chapter.order}
            title={chapter.title}
            isFirst={index === 0}
            isMobile={isMobile}
          />
        ))}
      </div>

      <div className='mt-3 flex justify-between'>
        <Button
          onClick={() => deletePart.mutate(id)}
          className={cn(
            'border-red-500/80 text-red-500/80 hover:bg-red-500/10 active:bg-red-500/20',
            isMobile && 'px-2',
          )}
        >
          {isMobile ? <Trash2 className='size-5' /> : 'Удалить всю часть'}
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
