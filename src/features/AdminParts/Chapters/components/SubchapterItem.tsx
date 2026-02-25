'use client'

import type { Subchapter } from '@/services/types'
import { Input, Textarea } from '@/shared/ui'
import { useDeleteSubchapter } from '../../queries'

interface SubchapterItemProps {
  chapterId: string
  subchapter: Subchapter
}

export function SubchapterItem({ chapterId, subchapter }: SubchapterItemProps) {
  const deleteSubchapter = useDeleteSubchapter(chapterId)

  return (
    <div className='flex flex-col items-start border-t pt-4'>
      <div className='flex w-full flex-col'>
        <Input label='Заголовок' defaultValue={subchapter.title} />
        <Textarea label='Описание' defaultValue={subchapter.description} />
      </div>

      <button
        onClick={() => deleteSubchapter.mutate(subchapter.id)}
        className='cursor-pointer text-red-500/80 hover:text-red-500'
        disabled={deleteSubchapter.isPending}
      >
        {deleteSubchapter.isPending ? 'Удаление...' : 'Удалить'}
      </button>
    </div>
  )
}
