'use client'

import { useDeleteSubchapter, useUpdateSubchapter } from '@/services/theory'
import type { Subchapter } from '@/services/types'
import { Button, Input, Textarea } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { subchapterSchema, type SubchapterFormValues } from '../schema'

interface SubchapterItemProps {
  chapterId: string
  subchapter: Subchapter
}

export function SubchapterItem({ chapterId, subchapter }: SubchapterItemProps) {
  const deleteSubchapter = useDeleteSubchapter(chapterId)
  const updateSubchapter = useUpdateSubchapter(chapterId)

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<SubchapterFormValues>({
    resolver: zodResolver(subchapterSchema),
    mode: 'onChange',
    defaultValues: {
      title: subchapter.title,
      description: subchapter.description,
    },
  })

  const onSubmit = handleSubmit((data) => {
    updateSubchapter.mutate({
      id: subchapter.id,
      data: {
        ...data,
        chapterId,
        order: subchapter.order,
      },
    })
  })

  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col items-start border-t pt-4'
    >
      <div className='flex w-full flex-col'>
        <Input
          label='Заголовок'
          {...register('title')}
          disabled={updateSubchapter.isPending}
        />
        <Textarea
          label='Описание'
          {...register('description')}
          disabled={updateSubchapter.isPending}
        />
      </div>

      <div className='flex w-full justify-between gap-4'>
        <button
          type='button'
          onClick={() => deleteSubchapter.mutate(subchapter.id)}
          className='cursor-pointer text-red-500/80 transition-colors duration-200 hover:text-red-500 disabled:opacity-50'
          disabled={deleteSubchapter.isPending || updateSubchapter.isPending}
        >
          {deleteSubchapter.isPending ? 'Удаление...' : 'Удалить'}
        </button>

        <Button
          type='submit'
          disabled={!isDirty || !isValid || updateSubchapter.isPending}
        >
          {updateSubchapter.isPending ? 'Сохранение...' : 'Обновить'}
        </Button>
      </div>
    </form>
  )
}
