'use client'

import { useFigmaChapters } from '@/services/figma'
import { useFigmaStore } from '@/services/stores/figmaStore'
import { Loader } from '@/shared/ui/Loader'
import { redirect } from 'next/navigation'

export default function FigmaPage() {
  const currentChapterId = useFigmaStore((state) => state.currentChapter)
  const { chapters, isLoading } = useFigmaChapters()

  if (isLoading) return <Loader />

  const targetId =
    chapters.find((chapter) => chapter.id === currentChapterId)?.id ||
    chapters[0]?.id

  if (targetId) {
    redirect(`/figma/${targetId}`)
  }

  return (
    <div className='text-muted-foreground flex flex-1 items-center justify-center text-sm'>
      Методичка Figma пуста
    </div>
  )
}
