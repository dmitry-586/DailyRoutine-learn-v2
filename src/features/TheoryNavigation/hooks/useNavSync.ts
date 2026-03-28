'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface UseNavSyncParams {
  chapterId: string
  prevChapterId: string | null
  nextChapterId: string | null
  setCurrentChapter: (chapterId: string) => void
}

export function useNavSync({
  chapterId,
  prevChapterId,
  nextChapterId,
  setCurrentChapter,
}: UseNavSyncParams) {
  const router = useRouter()
  const prefetchedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!chapterId) return

    setCurrentChapter(chapterId)
  }, [chapterId, setCurrentChapter])

  useEffect(() => {
    if (!chapterId) return

    for (const id of [prevChapterId, nextChapterId]) {
      if (!id || id === chapterId || prefetchedRef.current.has(id)) continue

      prefetchedRef.current.add(id)
      router.prefetch(`/theory/${id}`)
    }
  }, [chapterId, nextChapterId, prevChapterId, router])
}
