import type { Part } from '@/services'

function sortChapters<T extends Part['chapters'][number]>(chapters: T[]) {
  return [...chapters].sort((a, b) => a.order - b.order)
}

export function sortParts(parts: Part[]): Part[] {
  return [...parts]
    .sort((a, b) => a.order - b.order)
    .map((part) => ({
      ...part,
      chapters: sortChapters(part.chapters),
    }))
}

export function chapterIdFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const theoryIndex = segments.indexOf('theory')

  if (theoryIndex === -1) return ''

  return segments[theoryIndex + 1] ?? ''
}

export function findGlobalIndex(parts: Part[], partId: string, inPart: number) {
  let global = 0

  for (const part of parts) {
    if (part.id === partId) {
      return global + inPart
    }

    global += part.chapters.length
  }

  return -1
}
