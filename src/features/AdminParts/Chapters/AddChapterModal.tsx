'use client'

import { useCreateChapter } from '@/services/theory'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { BaseModal, EntityInputs, FormFooter } from '../ui'
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

  const methods = useForm<ChapterFormValues>({
    mode: 'onChange',
    resolver: zodResolver(createChapterSchema(minOrder, maxOrder)),
    values: isOpen
      ? {
          title: '',
          order: maxOrder,
        }
      : undefined,
  })

  const onSubmit = methods.handleSubmit((data) => {
    createChapter.mutate(
      { ...data, partId },
      {
        onSuccess: () => {
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
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className='mt-5 flex flex-col gap-4'>
          <EntityInputs
            orderLabel='Порядок'
            titleLabel='Название главы'
            orderInputCN='w-full'
          />

          <FormFooter
            onCancel={handleClose}
            isPending={createChapter.isPending}
            submitDisabled={!methods.formState.isValid}
          />
        </form>
      </FormProvider>
    </BaseModal>
  )
}
