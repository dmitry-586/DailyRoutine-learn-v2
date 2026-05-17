'use client'

import { useFigmaChapters } from '@/services/figma'
import { useFigmaStore } from '@/services/stores/figmaStore'
import { sortByOrder } from '@/shared/lib'
import { Loader } from '@/shared/ui/Loader'
import { redirect } from 'next/navigation'

export default function FigmaPage() {
  const currentChapterId = useFigmaStore((state) => state.currentChapter)
  const { chapters, isLoading } = useFigmaChapters()

  if (isLoading) return <Loader />

  const sortedChapters = sortByOrder(chapters)
  const targetId = currentChapterId || sortedChapters[0]?.id

  if (targetId) {
    redirect(`/figma/${targetId}`)
  }

  return (
    <div className='text-muted-foreground flex flex-1 items-center justify-center text-sm'>
      Методичка Figma пуста
    </div>
  )
}
