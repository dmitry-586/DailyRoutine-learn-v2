'use client'

import { Chapter } from '@/services'
import { Button } from '@/shared/ui'
import { CircleAlert } from 'lucide-react'
import { useState } from 'react'
import { EntityInputs } from '../ui'
import { ChapterModal } from './ChapterModal'

interface ChapterCardProps extends Chapter {
  isFirst: boolean
  isMobile: boolean
}

export function ChapterCard({
  order,
  title,
  id,
  isFirst,
  isMobile,
}: ChapterCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <div className='flex items-end gap-3 sm:gap-5'>
      <EntityInputs
        key={`${id}-${order}`}
        order={order}
        title={title}
        orderLabel={isFirst ? (isMobile ? 'Номер' : 'Номер главы') : ''}
        titleLabel={isFirst ? 'Название главы' : ''}
      />
      {isMobile ? (
        <button onClick={() => setIsOpen(true)} className='mb-7'>
          <CircleAlert className='text-primary hover:text-primary/80 size-7 cursor-pointer transition-colors duration-200' />
        </button>
      ) : (
        <Button onClick={() => setIsOpen(true)} className='mb-5 py-2 lg:py-3'>
          Открыть
        </Button>
      )}

      <ChapterModal id={id} isOpen={isOpen} handleClose={handleClose} />
    </div>
  )
}
