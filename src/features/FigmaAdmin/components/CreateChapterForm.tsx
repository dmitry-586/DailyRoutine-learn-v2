'use client'

import { useCreateFigmaChapter } from '@/services/figma'
import { EntityInputs, FormFooter } from '@/shared/ui/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
  createFigmaChapterSchema,
  type FigmaChapterFormValues,
} from '../schema'

interface CreateChapterFormProps {
  nextOrder: number
  onCreated?: () => void
  onCancel?: () => void
}

export function CreateChapterForm({
  nextOrder,
  onCreated,
  onCancel,
}: CreateChapterFormProps) {
  const createChapter = useCreateFigmaChapter()

  const methods = useForm<FigmaChapterFormValues>({
    mode: 'onChange',
    resolver: zodResolver(createFigmaChapterSchema(nextOrder)),
    values: {
      title: '',
      order: nextOrder,
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    createChapter.mutate(
      { ...data, title: data.title.trim() },
      {
        onSuccess: () => {
          methods.reset()
          onCreated?.()
        },
      },
    )
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className='mt-5 flex flex-col gap-4'>
        <EntityInputs
          key={nextOrder}
          orderLabel='Номер'
          titleLabel='Название главы'
          orderInputCN='w-full'
        />

        <FormFooter
          onCancel={onCancel ?? (() => methods.reset())}
          isPending={createChapter.isPending}
          submitDisabled={!methods.formState.isValid}
        />
      </form>
    </FormProvider>
  )
}
