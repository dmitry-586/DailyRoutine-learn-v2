'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useNavData } from './useNavData'
import { useNavPosition } from './useNavPosition'
import { useNavSync } from './useNavSync'

export function useNav() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const { parts, chapterId, setCurrentChapter } = useNavData()
  const { part, inPart, prevChapterId, nextChapterId } = useNavPosition(
    parts,
    chapterId,
  )

  useNavSync({
    chapterId,
    prevChapterId,
    nextChapterId,
    setCurrentChapter,
  })

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState)
  }

  const goTo = (id: string) => {
    if (!id) return

    setMenuOpen(false)

    if (id === chapterId) return

    router.push(`/theory/${id}`)
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

  return {
    menuOpen,
    parts,
    chapterId,
    part,
    inPart,
    hasPrev: Boolean(prevChapterId),
    hasNext: Boolean(nextChapterId),
    toggleMenu,
    goTo,
    prev,
    next,
  }
}
