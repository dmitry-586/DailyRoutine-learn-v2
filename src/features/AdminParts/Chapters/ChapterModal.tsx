'use client'

import { useChapterById } from '@/services/hooks'
import { Button } from '@/shared/ui'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Loader2 } from 'lucide-react'
import { useDeleteChapter } from '../queries'
import { SubchapterForm } from './components/SubchapterForm'
import { SubchapterItem } from './components/SubchapterItem'

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
    <Dialog open={isOpen} onClose={handleClose}>
      <section className='fixed inset-0 flex items-center justify-center bg-black/30 p-4'>
        <DialogPanel className='bg-background flex max-h-[95vh] w-full max-w-3xl flex-col space-y-4 overflow-auto rounded-xl p-6 pb-0'>
          <DialogTitle className='font-semibold'>
            Редактирование главы {chapter?.order}
          </DialogTitle>

          {isLoading && <Loader2 className='mx-auto animate-spin' />}

          {chapter && (
            <>
              <p className='text-primary'>{chapter.title}</p>

              <div className='space-y-4'>
                {chapter.subchapters.map((sub) => (
                  <SubchapterItem
                    key={sub.id}
                    chapterId={id}
                    subchapter={sub}
                  />
                ))}
              </div>

              <SubchapterForm chapterId={id} nextOrder={nextOrder} />

              <div className='bg-background sticky bottom-0 flex justify-between gap-5 border-t py-4'>
                <button
                  onClick={handleClose}
                  className='cursor-pointer text-red-500/80 hover:text-red-500'
                >
                  Отмена
                </button>

                <div className='flex gap-5'>
                  <Button
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
        </DialogPanel>
      </section>
    </Dialog>
  )
}
