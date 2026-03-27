import type { Part } from '@/services'
import type { ChapterPos } from '../types'

export function useNavPosition(parts: Part[], chapterId: string) {
  const chapterIds: string[] = []
  let pos: ChapterPos = { part: null, inPart: -1, global: -1 }
  let global = 0

  for (const part of parts) {
    for (let inPart = 0; inPart < part.chapters.length; inPart += 1) {
      const id = part.chapters[inPart].id
      chapterIds.push(id)

      if (id === chapterId) {
        pos = { part, inPart, global }
      }

      global += 1
    }
  }

  const prevChapterId = pos.global > 0 ? chapterIds[pos.global - 1] : null
  const nextChapterId =
    pos.global >= 0 && pos.global < chapterIds.length - 1
      ? chapterIds[pos.global + 1]
      : null

  return { pos, prevChapterId, nextChapterId, chapterIds }
}
