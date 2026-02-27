'use client'

import { Part } from '@/services'
import { useWindowWidth } from '@/services/hooks'
import { useDeletePart } from '@/services/theory'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { AddChapterModal, ChapterCard } from './Chapters'
import { EntityInputs } from './ui'
import { usePartEditor } from './usePartEditor'

interface PartCardProps {
  part: Part
  chaptersCount: number
}

export function PartCard({ part, chaptersCount }: PartCardProps) {
  const isMobile = useWindowWidth() <= 640
  const [isOpen, setIsOpen] = useState(false)

  const minOrder = chaptersCount + 1
  const maxOrder = chaptersCount + part.chapters.length

  const deletePart = useDeletePart()
  const { methods, onSubmit } = usePartEditor(part, minOrder, maxOrder)
  const { isDirty, isValid } = methods.formState

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className='sm:bg-gray/40 sm:hover:border-primary/50 flex flex-col border-t py-6 transition-all duration-300 sm:rounded-2xl sm:border sm:border-white/10 sm:px-4 sm:shadow-sm sm:hover:shadow-lg'
      >
        <EntityInputs
          className='px-4 sm:px-0'
          orderLabel={isMobile ? 'Номер' : 'Номер части'}
          titleLabel='Название части'
          namePrefix='part'
        />

        <div className='mt-3 flex flex-col border-t border-white/10 pt-5'>
          {part.chapters.map((chapter, index) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              isFirst={index === 0}
              index={index}
            />
          ))}
        </div>

        <div className='mt-3 flex justify-between'>
          <Button
            type='button'
            onClick={() => deletePart.mutate(part.id)}
            className={cn(
              'border-red-500/80 text-red-500/80 hover:bg-red-500/10 active:bg-red-500/20',
              isMobile && 'px-2',
            )}
          >
            {isMobile ? <Trash2 className='size-5' /> : 'Удалить всю часть'}
          </Button>

          <div className='flex gap-5'>
            <Button type='button' onClick={() => setIsOpen(true)}>
              Добавить главу
            </Button>

            <Button type='submit' disabled={!isDirty || !isValid}>
              Сохранить
            </Button>
          </div>
        </div>
      </form>

      <AddChapterModal
        partId={part.id}
        isOpen={isOpen}
        minOrder={minOrder}
        maxOrder={maxOrder + 1}
        handleClose={() => setIsOpen(false)}
      />
    </FormProvider>
  )
}
