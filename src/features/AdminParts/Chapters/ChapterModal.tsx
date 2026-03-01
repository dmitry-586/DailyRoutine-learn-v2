'use client'

import { useChapterById } from '@/services/hooks'
import { useDeleteChapter } from '@/services/theory'
import { Button } from '@/shared/ui'
import { Loader2 } from 'lucide-react'
import { BaseModal } from '../ui'
import { SubchapterForm } from './Subchapters/SubchapterForm'
import { SubchapterItem } from './Subchapters/SubchapterItem'

interface ChapterDialogProps {
  id: string
  isOpen: boolean
  handleClose: () => void
}

export function ChapterModal({ id, isOpen, handleClose }: ChapterDialogProps) {
  const { chapter, isLoading } = useChapterById(id, isOpen)
  const deleteChapter = useDeleteChapter()

  const nextOrder = (chapter?.subchapters.at(-1)?.order ?? 0) + 1

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Редактирование главы ${chapter?.order ?? ''}`}
      className='max-w-3xl'
    >
      {isLoading && <Loader2 className='mx-auto animate-spin' />}

      {chapter && (
        <>
          <p className='text-primary mt-2'>{chapter.title}</p>

          <div className='mt-4 space-y-4'>
            {chapter.subchapters.map((sub) => (
              <SubchapterItem key={sub.id} chapterId={id} subchapter={sub} />
            ))}
          </div>

          <SubchapterForm chapterId={id} nextOrder={nextOrder} />

          <div className='bg-background sticky bottom-0 mt-4 flex justify-between gap-5 border-t pt-4'>
            <button
              type='button'
              onClick={handleClose}
              className='cursor-pointer text-red-500/80 hover:text-red-500'
            >
              Отмена
            </button>

            <div className='flex gap-5'>
              <Button
                type='button'
                onClick={() => deleteChapter.mutate(id)}
                className='border-red-500/80 text-red-500/80 hover:bg-red-500/10 active:bg-red-500/20'
                disabled={deleteChapter.isPending}
              >
                {deleteChapter.isPending ? 'Удаление...' : 'Удалить главу'}
              </Button>
            </div>
          </div>
        </>
      )}
    </BaseModal>
  )
}
