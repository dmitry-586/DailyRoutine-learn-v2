'use client'

import { useDeleteFigmaSection, useUpdateFigmaSection } from '@/services/figma'
import type { FigmaSection } from '@/services/types'
import { Button, ConfirmModal } from '@/shared/ui'
import { EntityInputs } from '@/shared/ui/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import {
  createFigmaSectionSchema,
  type FigmaSectionFormValues,
} from '../schema'
import { MediaMarkdownTextarea } from './MediaMarkdownTextarea'

interface SectionEditorProps {
  section: FigmaSection
  maxOrder: number
}

export function SectionEditor({ section, maxOrder }: SectionEditorProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const updateSection = useUpdateFigmaSection(section.chapterId)
  const deleteSection = useDeleteFigmaSection(section.chapterId)

  const methods = useForm<FigmaSectionFormValues>({
    resolver: zodResolver(createFigmaSectionSchema(maxOrder)),
    mode: 'onChange',
    values: {
      title: section.title,
      content: section.content,
      order: section.order,
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = methods

  const onSubmit = handleSubmit((data) => {
    updateSection.mutate({
      id: section.id,
      data: {
        chapterId: section.chapterId,
        ...data,
        title: data.title.trim(),
        content: data.content.trim(),
      },
    })
  })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className='flex flex-col items-start border-t py-4'
      >
        <EntityInputs
          key={`${section.id}-${section.order}`}
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
              disabled={updateSection.isPending || deleteSection.isPending}
            />
          )}
        />

        <div className='mt-4 flex w-full items-center justify-between gap-4'>
          <button
            type='button'
            onClick={() => setIsDeleteOpen(true)}
            className='cursor-pointer text-red-500/80 transition-colors duration-200 hover:text-red-500 disabled:opacity-50'
            disabled={updateSection.isPending || deleteSection.isPending}
          >
            {deleteSection.isPending ? 'Удаление...' : 'Удалить'}
          </button>

          <Button
            type='submit'
            disabled={!isDirty || !isValid || updateSection.isPending}
          >
            {updateSection.isPending ? 'Сохранение...' : 'Обновить'}
          </Button>
        </div>

        <ConfirmModal
          isOpen={isDeleteOpen}
          onConfirm={() =>
            deleteSection.mutate(section.id, {
              onSuccess: () => setIsDeleteOpen(false),
            })
          }
          onCancel={() => setIsDeleteOpen(false)}
          title='Подтвердите удаление'
          message='Удалить раздел Figma?'
          deleteMessage='Удалить'
        />
      </form>
    </FormProvider>
  )
}
