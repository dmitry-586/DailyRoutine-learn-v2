import { useChapterById } from '@/services/hooks'
import { Button, Input } from '@/shared/ui'
import { Dialog, DialogPanel, DialogTitle, Textarea } from '@headlessui/react'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  useDeleteChapter,
  useDeleteSubchapter,
  useSubchapterMutation,
} from '../queries'

interface ChapterDialogProps {
  id: string
  isOpen: boolean
  handleClose: () => void
}

export function ChapterModal({ id, isOpen, handleClose }: ChapterDialogProps) {
  const { chapter, isLoading } = useChapterById(id, isOpen)
  const chapterDelete = useDeleteChapter()
  const subchapterCreate = useSubchapterMutation(id)
  const subchapterDelete = useDeleteSubchapter(id)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [order, setOrder] = useState(1)

  useEffect(() => {
    const nextOrder = chapter?.subchapters.length
      ? Math.max(...chapter.subchapters.map((item) => item.order)) + 1
      : 1
    setOrder(nextOrder)
  }, [chapter?.id, chapter?.subchapters.length])

  return (
    <Dialog open={isOpen} onClose={handleClose} className='relative z-50'>
      <section className='fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4'>
        <DialogPanel className='bg-background max-h-[95vh] w-full max-w-3xl space-y-4 overflow-auto rounded-xl border border-white/20 p-6 shadow-sm'>
          <DialogTitle className='font-semibold'>
            Редактирование главы {chapter?.order}
          </DialogTitle>

          {isLoading && (
            <Loader2 className='text-primary mx-auto min-h-[30vh] animate-spin' />
          )}

          <p className='text-primary'>{chapter?.title}</p>
          {chapter?.subchapters.map((el) => (
            <div
              key={el.id}
              className='flex items-start gap-5 border-t border-white/60 pt-4'
            >
              <div className='flex flex-1 flex-col'>
                <Input label='Заголовок' defaultValue={el.title} />
                <Textarea
                  className='bg-gray/60 hover:bg-gray/70 min-h-60 w-full rounded-2xl border border-white/10 px-3 py-2 text-sm shadow-sm backdrop-blur-md transition-all duration-300 outline-none hover:border-white/30 active:bg-white/10 disabled:pointer-events-none disabled:opacity-50'
                  defaultValue={el.description}
                />
              </div>
              <button
                onClick={() => subchapterDelete.mutate(el.id)}
                className='cursor-pointer text-red-500/80 transition-colors duration-200 hover:text-red-500'
              >
                Удалить
              </button>
            </div>
          ))}

          <div className='flex flex-col border-t border-white/60 pt-4'>
            <p className='text-primary text-sm'>Новая подглава</p>
            <Input
              label='Заголовок'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={subchapterCreate.isPending}
            />
            <Textarea
              className='bg-gray/60 hover:bg-gray/70 min-h-60 w-full rounded-2xl border border-white/10 px-3 py-2 text-sm shadow-sm backdrop-blur-md transition-all duration-300 outline-none hover:border-white/30 active:bg-white/10 disabled:pointer-events-none disabled:opacity-50'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={subchapterCreate.isPending}
            />
            <Input
              label='Порядок'
              type='number'
              value={order}
              onChange={(event) => setOrder(Number(event.target.value))}
              disabled={subchapterCreate.isPending}
            />
            <div className='flex justify-end pt-2'>
              <Button
                className='text-primary'
                disabled={!title || !description || subchapterCreate.isPending}
                onClick={() =>
                  subchapterCreate.mutate(
                    { chapterId: id, title, description, order },
                    {
                      onSuccess: () => {
                        setTitle('')
                        setDescription('')
                      },
                    },
                  )
                }
              >
                Создать подглаву
              </Button>
            </div>
          </div>

          <div className='flex justify-between gap-5'>
            <button
              className='cursor-pointer text-red-500/80 transition-colors duration-200 hover:text-red-500'
              onClick={handleClose}
            >
              Отмена
            </button>
            <div className='flex gap-5'>
              <button
                onClick={() => chapterDelete.mutate(id)}
                className='cursor-pointer text-red-500/80 transition-colors duration-200 hover:text-red-500'
              >
                Удалить
              </button>
              <Button className='text-primary' onClick={handleClose}>
                Сохранить
              </Button>
            </div>
          </div>
        </DialogPanel>
      </section>
    </Dialog>
  )
}
