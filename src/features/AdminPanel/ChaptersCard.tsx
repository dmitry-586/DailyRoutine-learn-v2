import { Chapter } from '@/services'
import { Button, Input } from '@/shared/ui'

export function ChaptersCard({ order, title }: Chapter) {
  return (
    <div className='flex items-end gap-5'>
      <Input
        defaultValue={order}
        wrapperCN='w-26'
        inputCN='text-center'
        label={order === 1 ? 'Номер главы' : ''}
      />
      <Input
        defaultValue={title}
        wrapperCN='w-full'
        label={order === 1 ? 'Название главы' : ''}
      />
      <Button className='mb-5 py-3'>Открыть</Button>
    </div>
  )
}
