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
    <div className='flex w-full items-end gap-5'>
      <Input
        defaultValue={order}
        wrapperCN='w-26'
        inputCN={cn('text-center text-sm py-2', orderInputCN)}
        label={orderLabel}
      />
      <Input
        defaultValue={title}
        wrapperCN='w-full'
        inputCN='text-sm py-2'
        label={titleLabel}
      />
    </div>
  )
}
