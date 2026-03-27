'use client'

import { useTheoryStore } from '@/services/stores/theoryStore'
import { useParts } from '@/services/theory'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { chapterIdFromPath, sortParts } from '../utils'

export function useNavData() {
  const pathname = usePathname()
  const { parts: rawParts } = useParts()
  const setCurrentChapter = useTheoryStore((state) => state.setCurrentChapter)

  const parts = useMemo(() => sortParts(rawParts), [rawParts])
  const chapterId = chapterIdFromPath(pathname)

  return { parts, chapterId, setCurrentChapter }
}
