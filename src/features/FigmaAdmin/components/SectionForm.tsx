'use client'

import { useCreateFigmaSection } from '@/services/figma'
import { EntityInputs, FormFooter } from '@/shared/ui/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import {
  createFigmaSectionSchema,
  type FigmaSectionFormValues,
} from '../schema'
import { MediaMarkdownTextarea } from './MediaMarkdownTextarea'

interface SectionFormProps {
  chapterId: string
  nextOrder: number
}

export function SectionForm({ chapterId, nextOrder }: SectionFormProps) {
  const createSection = useCreateFigmaSection(chapterId)

  const methods = useForm<FigmaSectionFormValues>({
    resolver: zodResolver(createFigmaSectionSchema(nextOrder)),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      order: nextOrder,
    },
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = methods

  const onSubmit = handleSubmit((data) => {
    createSection.mutate(
      {
        chapterId,
        ...data,
        title: data.title.trim(),
        content: data.content.trim(),
      },
      {
        onSuccess: () => reset(),
      },
    )
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className='flex flex-1 flex-col border-t pt-4'>
        <p className='text-primary mb-4 text-sm'>
          Новый раздел (№ {nextOrder})
        </p>

        <EntityInputs
          key={`${chapterId}-${nextOrder}`}
          titleLabel='Заголовок'
        />

        <Controller
          control={control}
          name='content'
          render={({ field }) => (
            <MediaMarkdownTextarea
              value={field.value}
              onChange={field.onChange}
              error={errors.content?.message}
              disabled={createSection.isPending}
            />
          )}
        />

        <FormFooter
          onCancel={() => reset()}
          submitLabel='Создать раздел'
          cancelLabel='Очистить'
          isPending={createSection.isPending}
          submitDisabled={!isValid}
          className='flex justify-between pt-2'
        />
      </form>
    </FormProvider>
  )
}
