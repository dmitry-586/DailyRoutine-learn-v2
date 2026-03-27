'use client'

import type { Part } from '@/services'
import { useRouter } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'
import { findGlobalIndex } from '../utils'

interface UseNavActionsParams {
  parts: Part[]
  chapterIds: string[]
  prevChapterId: string | null
  nextChapterId: string | null
  setCurrentChapter: (chapterId: string) => void
  setMenuOpen: Dispatch<SetStateAction<boolean>>
}

export function useNavActions({
  parts,
  chapterIds,
  prevChapterId,
  nextChapterId,
  setCurrentChapter,
  setMenuOpen,
}: UseNavActionsParams) {
  const router = useRouter()

  const goTo = (id: string) => {
    if (!id) return

    setCurrentChapter(id)
    setMenuOpen(false)
    router.push(`/theory/${id}`)
  }

  const goToGlobal = (globalIndex: number) => {
    const targetChapterId = chapterIds[globalIndex]

    if (targetChapterId) {
      goTo(targetChapterId)
    }
  }

  const goToInPart = (partId: string, inPart: number) => {
    const global = findGlobalIndex(parts, partId, inPart)

    if (global !== -1) {
      goToGlobal(global)
    }
  }

  const prev = () => {
    if (prevChapterId) {
      goTo(prevChapterId)
    }
  }

  const next = () => {
    if (nextChapterId) {
      goTo(nextChapterId)
    }
  }

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState)
  }

  return {
    toggleMenu,
    goTo,
    prev,
    next,
    goToInPart,
  }
}
