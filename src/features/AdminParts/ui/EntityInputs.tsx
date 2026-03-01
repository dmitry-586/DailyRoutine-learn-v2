import { cn } from '@/shared/lib'
import { Input } from '@/shared/ui'
import { useFormContext } from 'react-hook-form'

interface EntityInputsProps {
  orderLabel?: string
  titleLabel?: string
  orderInputCN?: string
  namePrefix?: string
  className?: string
}

export function EntityInputs({
  orderLabel = 'Номер',
  titleLabel = 'Название',
  orderInputCN,
  namePrefix,
  className,
}: EntityInputsProps) {
  const { register, getFieldState, formState } = useFormContext()

  const prefix = namePrefix ? `${namePrefix}.` : ''

  const orderState = getFieldState(`${prefix}order`, formState)
  const titleState = getFieldState(`${prefix}title`, formState)

  return (
    <div className={cn('flex w-full items-end gap-3 sm:gap-5', className)}>
      <Input
        wrapperCN='w-12 sm:w-26'
        inputCN={cn('text-center', orderInputCN)}
        label={orderLabel}
        {...register(`${prefix}order`, { valueAsNumber: true })}
        error={orderState.error?.message}
      />
      <Input
        wrapperCN='w-full'
        label={titleLabel}
        {...register(`${prefix}title`)}
        error={titleState.error?.message}
      />
    </div>
  )
}
