'use client'

import { Button, Input } from '@/shared/ui'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { usePartMutation } from './queries'
import { PartFormValues, partSchema } from './schema'

interface AddPartModalProps {
  isOpen: boolean
  partsCount: number
  handleClose: () => void
}

export function AddPartModal({
  isOpen,
  partsCount,
  handleClose,
}: AddPartModalProps) {
  const partMutation = usePartMutation()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PartFormValues>({
    mode: 'onChange',
    resolver: zodResolver(partSchema),
  })

  const onSubmit = handleSubmit((data) => {
    partMutation.mutate(data, {
      onSuccess: () => {
        reset()
        handleClose()
      },
    })
  })

  return (
    <Dialog open={isOpen} onClose={handleClose} className='relative z-50'>
      <section className='fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4'>
        <DialogPanel className='bg-background max-h-[95vh] w-full max-w-md overflow-auto rounded-xl border border-white/20 p-6 shadow-sm'>
          <DialogTitle className='font-semibold'>
            Добавить новую часть
          </DialogTitle>

          <form onSubmit={onSubmit} className='mt-5'>
            <Input
              {...register('title')}
              label='Название части'
              placeholder='Введите название'
              wrapperCN='w-full'
              disabled={partMutation.isPending}
              error={errors.title?.message}
              required
            />

            <Input
              {...register('order', {
                valueAsNumber: true,
              })}
              defaultValue={partsCount + 1}
              label='Порядок'
              type='number'
              wrapperCN='w-full'
              placeholder='Введите порядковый номер'
              disabled={partMutation.isPending}
              error={errors.order?.message}
              min={1}
              required
            />

            <div className='flex justify-end gap-4 pt-4'>
              <button
                type='button'
                className='cursor-pointer text-red-500/80 transition-colors duration-200 hover:text-red-500 disabled:pointer-events-none disabled:opacity-50'
                onClick={handleClose}
                disabled={partMutation.isPending}
              >
                Отмена
              </button>
              <Button
                type='submit'
                className='text-primary'
                disabled={partMutation.isPending}
              >
                Создать
              </Button>
            </div>
          </form>
        </DialogPanel>
      </section>
    </Dialog>
  )
}
