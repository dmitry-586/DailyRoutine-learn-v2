import { cn } from '@/shared/lib'
import { Input } from '@/shared/ui'

interface EntityInputsProps {
  order: number
  title: string
  orderLabel?: string
  titleLabel?: string
  orderInputCN?: string
}

export function EntityInputs({
  order,
  title,
  orderLabel = 'Номер',
  titleLabel = 'Название',
  orderInputCN,
}: EntityInputsProps) {
  return (
    <div className='flex w-full items-end gap-3 sm:gap-5'>
      <Input
        defaultValue={order}
        wrapperCN='w-12 sm:w-26'
        inputCN={cn('text-center', orderInputCN)}
        label={orderLabel}
      />
      <Input defaultValue={title} wrapperCN='w-full' label={titleLabel} />
    </div>
  )
}
