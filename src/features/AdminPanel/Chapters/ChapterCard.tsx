'use client'

import { Chapter } from '@/services'
import { Button, Input } from '@/shared/ui'
import { useState } from 'react'
import { ChapterDialog } from './ChapterDialog'

interface ChapterCardProps extends Chapter {
  isFirst: boolean
}

export function ChapterCard({ order, title, id, isFirst }: ChapterCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <div className='flex items-end gap-5'>
      <Input
        defaultValue={order}
        wrapperCN='w-26'
        inputCN='text-center text-sm py-2'
        label={isFirst ? 'Номер главы' : ''}
      />
      <Input
        defaultValue={title}
        wrapperCN='w-full'
        inputCN='text-sm py-2'
        label={isFirst ? 'Название главы' : ''}
      />
      <Button onClick={() => setIsOpen(true)} className='mb-5 py-2'>
        Открыть
      </Button>
      <ChapterDialog id={id} isOpen={isOpen} handleClose={handleClose} />
    </div>
  )
}
