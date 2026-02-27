'use client'

import { Chapter } from '@/services'
import { useWindowWidth } from '@/services/hooks'
import { Button } from '@/shared/ui'
import { CircleAlert } from 'lucide-react'
import { useState } from 'react'
import { EntityInputs } from '../ui'
import { ChapterModal } from './ChapterModal'

interface ChapterCardProps {
  chapter: Chapter
  isFirst: boolean
  index: number
}

export function ChapterCard({ chapter, isFirst, index }: ChapterCardProps) {
  const isMobile = useWindowWidth() <= 640
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <div className='flex items-end gap-3 sm:gap-5'>
      <EntityInputs
        key={`${chapter.id}-${chapter.order}`}
        orderLabel={isFirst ? (isMobile ? 'Номер' : 'Номер главы') : ''}
        titleLabel={isFirst ? 'Название главы' : ''}
        namePrefix={`chapters.${index}`}
      />
      {isMobile ? (
        <button type='button' onClick={() => setIsOpen(true)} className='mb-7'>
          <CircleAlert className='text-primary hover:text-primary/80 size-7 cursor-pointer transition-colors duration-200' />
        </button>
      ) : (
        <Button
          type='button'
          onClick={() => setIsOpen(true)}
          className='mb-5 py-2 lg:py-3'
        >
          Открыть
        </Button>
      )}

      <ChapterModal id={chapter.id} isOpen={isOpen} handleClose={handleClose} />
    </div>
  )
}
