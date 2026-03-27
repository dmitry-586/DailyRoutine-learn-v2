import type { Part } from '@/services'

interface ChapterPos {
  part: Part | null
  inPart: number
  global: number
}

interface NavView {
  menuOpen: boolean
  parts: Part[]
  chapterId: string
  part: Part | null
  inPart: number
  hasPrev: boolean
  hasNext: boolean
}

interface NavActions {
  toggleMenu: () => void
  goTo: (chapterId: string) => void
  prev: () => void
  next: () => void
  goToInPart: (partId: string, inPart: number) => void
}

export type { ChapterPos, NavActions, NavView }
