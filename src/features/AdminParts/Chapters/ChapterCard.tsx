'use client'

import { Chapter } from '@/services'
import { Button } from '@/shared/ui'
import { useState } from 'react'
import { EntityInputs } from '../ui'
import { ChapterModal } from './ChapterModal'

interface ChapterCardProps extends Chapter {
  isFirst: boolean
}

export function ChapterCard({ order, title, id, isFirst }: ChapterCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <div className='flex items-end gap-5'>
      <EntityInputs
        key={`${id}-${order}`}
        order={order}
        title={title}
        orderLabel={isFirst ? 'Номер главы' : ''}
        titleLabel={isFirst ? 'Название главы' : ''}
      />
      <Button onClick={() => setIsOpen(true)} className='mb-5 py-2'>
        Открыть
      </Button>
      <ChapterModal id={id} isOpen={isOpen} handleClose={handleClose} />
    </div>
  )
}
