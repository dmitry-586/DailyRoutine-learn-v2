import type { Part } from '@/services'
import { useMemo } from 'react'

type NavPosition = {
  part: Part | null
  inPart: number | null
  prevChapterId: string | null
  nextChapterId: string | null
}

function getNavPosition(parts: Part[], chapterId: string): NavPosition {
  if (!chapterId) {
    return {
      part: null,
      inPart: null,
      prevChapterId: null,
      nextChapterId: null,
    }
  }

  const chapters = parts.flatMap((part) =>
    part.chapters.map((chapter, index) => ({
      id: chapter.id,
      part,
      inPart: index,
    })),
  )

  const currentIndex = chapters.findIndex((chapter) => chapter.id === chapterId)

  if (currentIndex === -1) {
    return {
      part: null,
      inPart: null,
      prevChapterId: null,
      nextChapterId: null,
    }
  }

  const current = chapters[currentIndex]

  return {
    part: current.part,
    inPart: current.inPart,
    prevChapterId: chapters[currentIndex - 1]?.id ?? null,
    nextChapterId: chapters[currentIndex + 1]?.id ?? null,
  }
}

export function useNavPosition(parts: Part[], chapterId: string) {
  return useMemo(() => getNavPosition(parts, chapterId), [parts, chapterId])
}
