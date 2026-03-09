'use client'

import { useCreateSubchapter } from '@/services/theory'
import { Textarea } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { EntityInputs, FormFooter } from '../../ui'
import { createSubchapterSchema, type SubchapterFormValues } from '../schema'

interface SubchapterFormProps {
  chapterId: string
  nextOrder: number
}

export function SubchapterForm({ chapterId, nextOrder }: SubchapterFormProps) {
  const methods = useForm<SubchapterFormValues>({
    resolver: zodResolver(createSubchapterSchema(nextOrder)),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      order: nextOrder,
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = methods

  const createSubchapter = useCreateSubchapter(chapterId)

  const onSubmit = handleSubmit((data) => {
    createSubchapter.mutate(
      {
        chapterId,
        ...data,
      },
      {
        onSuccess: () => {
          reset()
        },
      },
    )
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className='flex flex-1 flex-col border-t pt-4'>
        <p className='text-primary mb-4 text-sm'>
          Новая подглава (№ {nextOrder})
        </p>

        <EntityInputs
          key={`${chapterId}-${nextOrder}`}
          titleLabel='Заголовок'
        />
        <Textarea
          label='Описание'
          {...register('description')}
          error={errors.description?.message}
          disabled={createSubchapter.isPending}
          placeholder='Введите описание подглавы'
        />

        <FormFooter
          onCancel={() => reset()}
          submitLabel='Создать подглаву'
          cancelLabel='Очистить'
          isPending={createSubchapter.isPending}
          submitDisabled={!isValid}
          className='flex justify-between pt-2'
        />
      </form>
    </FormProvider>
  )
}
