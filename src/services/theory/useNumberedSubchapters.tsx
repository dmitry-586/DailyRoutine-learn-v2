import { Subchapter } from '../types'
import { shouldNumber } from './helpers'

export function useNumberedSubchapters(
  chapterOrder: number,
  subchapters: Subchapter[],
) {
  let counter = 0

  return subchapters.map((subchapter) => {
    const isNumbered = shouldNumber(subchapter)

    if (isNumbered) counter++

    return {
      ...subchapter,
      number: isNumbered ? `${chapterOrder}.${counter}.` : '',
    }
  })
}
