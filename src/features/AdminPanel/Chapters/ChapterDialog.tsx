import { useChapterById } from '@/services/hooks'
import { Button, Input } from '@/shared/ui'
import { Dialog, DialogPanel, DialogTitle, Textarea } from '@headlessui/react'
import { Loader2 } from 'lucide-react'

interface ChapterDialogProps {
  id: string
  isOpen: boolean
  handleClose: () => void
}

export function ChapterDialog({ id, isOpen, handleClose }: ChapterDialogProps) {
  const { chapter, isLoading } = useChapterById(id, isOpen)

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
              className='flex flex-col border-t border-white/60 pt-4'
            >
              <Input label='Заголовок' defaultValue={el.title} />
              <Textarea
                className='bg-gray/60 hover:bg-gray/70 min-h-60 w-full rounded-2xl border border-white/10 px-3 py-2 text-sm shadow-sm backdrop-blur-md transition-all duration-300 outline-none hover:border-white/30 active:bg-white/10 disabled:pointer-events-none disabled:opacity-50'
                defaultValue={el.description}
              />
            </div>
          ))}

          <div className='flex justify-end gap-4'>
            <button
              className='cursor-pointer text-red-500/80 transition-colors duration-200 hover:text-red-500'
              onClick={handleClose}
            >
              Отмена
            </button>
            <Button className='text-primary' onClick={handleClose}>
              Сохранить
            </Button>
          </div>
        </DialogPanel>
      </section>
    </Dialog>
  )
}
