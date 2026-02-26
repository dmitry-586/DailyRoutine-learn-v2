import { useCreateChapter } from '@/services/theory'
import { Button, Input } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { BaseModal } from '../ui'
import { ChapterFormValues, createChapterSchema } from './schema'

interface ChapterModalProps {
  partId: string
  isOpen: boolean
  minOrder: number
  maxOrder: number
  handleClose: () => void
}

export function AddChapterModal({
  isOpen,
  partId,
  minOrder,
  maxOrder,
  handleClose,
}: ChapterModalProps) {
  const createChapter = useCreateChapter()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChapterFormValues>({
    mode: 'onChange',
    resolver: zodResolver(createChapterSchema(minOrder, maxOrder)),
  })

  const onSubmit = handleSubmit((data) => {
    createChapter.mutate(
      { ...data, partId },
      {
        onSuccess: () => {
          reset()
          handleClose()
        },
      },
    )
  })

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title='Добавить новую главу'
    >
      <form onSubmit={onSubmit} className='mt-5'>
        <Input
          {...register('title')}
          label='Название главы'
          placeholder='Введите название'
          wrapperCN='w-full'
          disabled={createChapter.isPending}
          error={errors.title?.message}
          required
        />

        <Input
          {...register('order', {
            valueAsNumber: true,
          })}
          defaultValue={Math.max(maxOrder, minOrder)}
          label='Порядок'
          type='number'
          wrapperCN='w-full'
          placeholder='Введите порядковый номер'
          disabled={createChapter.isPending}
          error={errors.order?.message}
          min={minOrder}
          max={maxOrder}
          required
        />

        <div className='flex justify-end gap-4 pt-4'>
          <button
            type='button'
            className='cursor-pointer text-red-500/80 transition-colors duration-200 hover:text-red-500 disabled:pointer-events-none disabled:opacity-50'
            onClick={handleClose}
            disabled={createChapter.isPending}
          >
            Отмена
          </button>
          <Button
            type='submit'
            className='text-primary'
            disabled={createChapter.isPending}
          >
            Создать
          </Button>
        </div>
      </form>
    </BaseModal>
  )
}
