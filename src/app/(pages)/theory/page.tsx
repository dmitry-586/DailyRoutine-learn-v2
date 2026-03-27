'use client'

import { useTheoryStore } from '@/services/stores/theoryStore'
import { useParts } from '@/services/theory'
import { redirect } from 'next/navigation'
import TheoryLoading from './loading'

export default function TheoryPage() {
  const currentChapterId = useTheoryStore((state) => state.currentChapter)
  const { parts, isLoading } = useParts()

  if (isLoading) return <TheoryLoading />

  const targetId = currentChapterId || parts[0]?.chapters[0]?.id

  if (targetId) {
    redirect(`/theory/${targetId}`)
  }

  return (
    <div className='text-muted-foreground flex flex-1 items-center justify-center text-sm'>
      Учебник пуст
    </div>
  )
}
