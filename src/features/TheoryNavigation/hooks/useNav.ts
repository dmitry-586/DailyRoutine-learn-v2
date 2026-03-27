'use client'

import { useState } from 'react'
import type { NavActions, NavView } from '../types'
import { useNavActions } from './useNavActions'
import { useNavData } from './useNavData'
import { useNavPosition } from './useNavPosition'
import { useNavSync } from './useNavSync'

export function useNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { parts, chapterId, setCurrentChapter } = useNavData()
  const { pos, prevChapterId, nextChapterId, chapterIds } = useNavPosition(
    parts,
    chapterId,
  )

  useNavSync({
    chapterId,
    prevChapterId,
    nextChapterId,
    setCurrentChapter,
  })

  const actions: NavActions = useNavActions({
    parts,
    chapterIds,
    prevChapterId,
    nextChapterId,
    setCurrentChapter,
    setMenuOpen,
  })

  const view: NavView = {
    menuOpen,
    parts,
    chapterId,
    part: pos.part,
    inPart: pos.inPart,
    hasPrev: Boolean(prevChapterId),
    hasNext: Boolean(nextChapterId),
  }

  return { view, actions }
}
