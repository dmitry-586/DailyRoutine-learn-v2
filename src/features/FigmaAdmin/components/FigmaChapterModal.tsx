'use client'

import { Modal } from '@/shared/ui'
import { ChapterEditor } from './ChapterEditor'

interface FigmaChapterModalProps {
  chapterId: string
  chapterOrder: number
  isOpen: boolean
  handleClose: () => void
}

export function FigmaChapterModal({
  chapterId,
  chapterOrder,
  isOpen,
  handleClose,
}: FigmaChapterModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Редактирование главы ${chapterOrder}`}
      className='min-h-[50vh] max-w-3xl pb-0 max-md:max-h-svh max-md:rounded-none max-md:border-none max-sm:px-4'
      wrapperCN='max-md:p-0'
    >
      <ChapterEditor chapterId={chapterId} />
    </Modal>
  )
}
