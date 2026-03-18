import { Subchapter } from '../types'

const EXCLUDED = new Set([
  'вопросы на собеседовании',
  'мини-задание',
  'мини задание',
])

function normalizeTitle(title: string) {
  return title.trim().toLowerCase()
}

export function shouldNumber(subchapter: Subchapter) {
  if (!subchapter.title) return false

  const normalized = normalizeTitle(subchapter.title)

  return !EXCLUDED.has(normalized)
}
