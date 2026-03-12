'use client'

import { useChapterById, useDeleteChapter } from '@/services'
import { Button, ConfirmModal, Modal } from '@/shared/ui'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { SubchapterForm, SubchapterItem } from './Subchapters'

interface ChapterDialogProps {
  id: string
  isOpen: boolean
  handleClose: () => void
}

export function ChapterModal({ id, isOpen, handleClose }: ChapterDialogProps) {
  const [isDelete, setIsDelete] = useState(false)

  const { chapter, isLoading } = useChapterById(id)
  const deleteChapter = useDeleteChapter()

  const nextOrder = (chapter?.subchapters.at(-1)?.order ?? 0) + 1

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={`Редактирование главы ${chapter?.order ?? ''}`}
        className='max-w-3xl pb-0 max-md:max-h-svh max-md:rounded-none max-md:border-none max-sm:px-4'
        wrapperCN='max-md:p-0'
      >
        {isLoading && <Loader2 className='mx-auto animate-spin' />}

        {chapter && (
          <>
            <p className='text-primary my-2'>{chapter.title}</p>

            {chapter.subchapters.map((sub) => (
              <SubchapterItem
                key={sub.id}
                chapterId={id}
                subchapter={sub}
                maxOrder={nextOrder - 1}
              />
            ))}

            <SubchapterForm
              key={nextOrder}
              chapterId={id}
              nextOrder={nextOrder}
            />

            <div className='bg-background sticky bottom-0 mt-4 flex justify-between gap-5 border-t py-4'>
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
                  onClick={() => setIsDelete(true)}
                  className='border-red-500/80 text-red-500/80 hover:bg-red-500/10 active:bg-red-500/20'
                  disabled={deleteChapter.isPending}
                >
                  {deleteChapter.isPending ? 'Удаление...' : 'Удалить главу'}
                </Button>
              </div>
            </div>
          </>
        )}
      </Modal>
      <ConfirmModal
        isOpen={isDelete}
        onConfirm={() => deleteChapter.mutate(id)}
        onCancel={() => setIsDelete(false)}
        title='Подтвердите удаление'
        message='Вы уверены, что хотите удалить эту главу?'
        deleteMessage='Удалить'
      />
    </>
  )
}
