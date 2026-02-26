'use client'

import { useCreateSubchapter } from '@/services/theory'
import { Button, Input, Textarea } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { subchapterSchema, type SubchapterFormValues } from '../schema'

interface SubchapterFormProps {
  chapterId: string
  nextOrder: number
}

export function SubchapterForm({ chapterId, nextOrder }: SubchapterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SubchapterFormValues>({
    resolver: zodResolver(subchapterSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const createSubchapter = useCreateSubchapter(chapterId)

  const onSubmit = (data: SubchapterFormValues) => {
    createSubchapter.mutate(
      {
        chapterId,
        ...data,
        order: nextOrder,
      },
      {
        onSuccess: () => {
          reset()
        },
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-1 flex-col border-t pt-4'
    >
      <p className='text-primary mb-4 text-sm'>
        Новая подглава (№ {nextOrder})
      </p>

      <Input
        label='Заголовок'
        {...register('title')}
        error={errors.title?.message}
        disabled={createSubchapter.isPending}
        placeholder='Введите заголовок'
      />

      <Textarea
        label='Описание'
        {...register('description')}
        error={errors.description?.message}
        disabled={createSubchapter.isPending}
        placeholder='Введите описание подглавы'
      />

      <div className='flex justify-end pt-2'>
        <Button type='submit' disabled={!isValid || createSubchapter.isPending}>
          {createSubchapter.isPending ? 'Создание...' : 'Создать подглаву'}
        </Button>
      </div>
    </form>
  )
}
