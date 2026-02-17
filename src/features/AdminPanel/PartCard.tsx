import { Part } from '@/services'
import { Button, Input } from '@/shared/ui'
import { ChapterCard } from './ChapterCard'

export function PartCard({ chapters, title, order }: Part) {
  return (
    <div className='bg-gray/40 hover:border-primary/50 hover:bg-gray/60 flex flex-col rounded-2xl border border-white/10 px-4 py-6 shadow-sm transition-all duration-300 hover:shadow-lg'>
      <div className='flex gap-5'>
        <Input
          defaultValue={order}
          wrapperCN='w-26'
          inputCN='text-center'
          label='Номер части'
        />
        <Input defaultValue={title} wrapperCN='w-full' label='Название части' />
      </div>
      <div className='mt-3 flex flex-col border-t border-white/40 pt-5'>
        {chapters.map((el, index) => (
          <ChapterCard
            key={el.id}
            id={el.id}
            order={el.order}
            title={el.title}
            isFirst={index === 0}
          />
        ))}
      </div>
      <div className='mt-3 flex justify-between'>
        <Button className='border-red-500/80 text-red-500/80 hover:bg-red-500/10 active:bg-red-500/20'>
          Удалить всю часть
        </Button>
        <Button>Сохранить</Button>
      </div>
    </div>
  )
}
