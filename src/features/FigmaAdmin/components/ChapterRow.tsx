'use client'

import { useDeleteFigmaChapter, useUpdateFigmaChapter } from '@/services/figma'
import type { FigmaChapter } from '@/services/types'
import { Button, ConfirmModal } from '@/shared/ui'
import { EntityInputs } from '@/shared/ui/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  createFigmaChapterSchema,
  type FigmaChapterFormValues,
} from '../schema'
import { FigmaChapterModal } from './FigmaChapterModal'

interface ChapterRowProps {
  chapter: FigmaChapter
  maxOrder: number
}

export function ChapterRow({ chapter, maxOrder }: ChapterRowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const updateChapter = useUpdateFigmaChapter(chapter.id)
  const deleteChapter = useDeleteFigmaChapter()

  const methods = useForm<FigmaChapterFormValues>({
    mode: 'onChange',
    resolver: zodResolver(createFigmaChapterSchema(maxOrder)),
    values: {
      title: chapter.title,
      order: chapter.order,
    },
  })

  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods

  const onSubmit = handleSubmit((data) => {
    updateChapter.mutate({ ...data, title: data.title.trim() })
  })

  return (
    <li className='sm:bg-gray/40 sm:hover:border-primary/50 border-t py-6 transition-all duration-300 sm:rounded-2xl sm:border sm:border-white/10 sm:px-4 sm:shadow-sm sm:hover:shadow-lg'>
      <button
        type='button'
        className='mb-4 flex w-full items-center justify-between gap-3 text-left'
        onClick={() => setIsOpen(true)}
      >
        <span className='min-w-0 text-sm font-medium'>
          Глава {chapter.order}. {chapter.title}
        </span>
        <span className='text-light-gray text-xs'>
          {chapter.sections.length}
        </span>
      </button>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className='flex flex-col gap-1'>
          <EntityInputs orderLabel='№' titleLabel='Название' />
          <div className='flex justify-between gap-3'>
            <Button
              type='button'
              variant='red'
              className='px-3'
              onClick={() => setIsDeleteOpen(true)}
              disabled={updateChapter.isPending || deleteChapter.isPending}
            >
              <Trash2 className='size-4' />
            </Button>
            <div className='flex gap-3'>
              <Button type='button' onClick={() => setIsOpen(true)}>
                Открыть
              </Button>
              <Button
                type='submit'
                className='px-3'
                disabled={!isDirty || !isValid || updateChapter.isPending}
              >
                <Save className='size-4' />
                {updateChapter.isPending ? '...' : 'Сохранить'}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onConfirm={() =>
          deleteChapter.mutate(chapter.id, {
            onSuccess: () => {
              setIsDeleteOpen(false)
            },
          })
        }
        onCancel={() => setIsDeleteOpen(false)}
        title='Подтвердите удаление'
        message='Удалить главу Figma вместе со всеми разделами?'
        deleteMessage='Удалить'
      />

      {isOpen && (
        <FigmaChapterModal
          chapterId={chapter.id}
          chapterOrder={chapter.order}
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
        />
      )}
    </li>
  )
}
