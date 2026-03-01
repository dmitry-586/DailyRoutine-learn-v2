'use client'

import { useCreatePart } from '@/services/theory'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { PartFormValues, partSchema } from './schema'
import { BaseModal, EntityInputs, FormFooter } from './ui'

interface AddPartModalProps {
  partsCount: number
  isOpen: boolean
  handleClose: () => void
}

export function AddPartModal({
  isOpen,
  partsCount,
  handleClose,
}: AddPartModalProps) {
  const createPart = useCreatePart()

  const methods = useForm<PartFormValues>({
    mode: 'onChange',
    resolver: zodResolver(partSchema),
    defaultValues: {
      order: partsCount + 1,
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    createPart.mutate(data, {
      onSuccess: () => {
        methods.reset()
        handleClose()
      },
    })
  })

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title='Добавить новую часть'
    >
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className='mt-5 flex flex-col gap-4'>
          <EntityInputs
            orderLabel='Порядок'
            titleLabel='Название части'
            orderInputCN='w-full'
          />

          <FormFooter
            onCancel={handleClose}
            isPending={createPart.isPending}
            submitDisabled={!methods.formState.isValid}
          />
        </form>
      </FormProvider>
    </BaseModal>
  )
}
