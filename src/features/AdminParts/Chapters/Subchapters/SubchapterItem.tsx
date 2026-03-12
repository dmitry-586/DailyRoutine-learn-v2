'use client'

import { useDeleteSubchapter, useUpdateSubchapter } from '@/services'
import type { Subchapter } from '@/services/types'
import { Button, ConfirmModal, Textarea } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { EntityInputs } from '../../ui'
import { createSubchapterSchema, type SubchapterFormValues } from '../schema'

interface SubchapterItemProps {
  chapterId: string
  subchapter: Subchapter
  maxOrder: number
}

export function SubchapterItem({
  chapterId,
  subchapter,
  maxOrder,
}: SubchapterItemProps) {
  const [isDelete, setIsDelete] = useState(false)

  const deleteSubchapter = useDeleteSubchapter(chapterId)
  const updateSubchapter = useUpdateSubchapter(chapterId)

  const methods = useForm<SubchapterFormValues>({
    resolver: zodResolver(createSubchapterSchema(maxOrder)),
    mode: 'onChange',
    values: {
      title: subchapter.title,
      description: subchapter.description,
      order: subchapter.order,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods

  const onSubmit = handleSubmit((data) => {
    updateSubchapter.mutate({
      id: subchapter.id,
      data: {
        chapterId,
        ...data,
      },
    })
  })

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
          className='flex flex-col items-start border-t py-4'
        >
          <EntityInputs
            key={`${chapterId}-${subchapter.order}`}
            titleLabel='Заголовок'
          />
          <Textarea
            wrapperCN='w-full'
            label='Описание'
            {...register('description')}
            disabled={updateSubchapter.isPending}
          />

          <div className='flex w-full items-center justify-between gap-4'>
            <button
              type='button'
              onClick={() => setIsDelete(true)}
              className='cursor-pointer text-red-500/80 transition-colors duration-200 hover:text-red-500 disabled:opacity-50'
              disabled={
                deleteSubchapter.isPending || updateSubchapter.isPending
              }
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
      </FormProvider>
      <ConfirmModal
        isOpen={isDelete}
        onConfirm={() => deleteSubchapter.mutate(subchapter.id)}
        onCancel={() => setIsDelete(false)}
        title='Подтвердите удаление'
        message='Вы уверены, что хотите удалить эту подглаву?'
        deleteMessage='Удалить'
      />
    </>
  )
}
