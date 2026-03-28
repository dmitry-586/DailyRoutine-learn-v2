import type { Part } from '@/services'
import { ArrowButton } from './ArrowButton'
import { Indicators } from './Indicators'

interface SwitcherProps {
  part: Part | null
  inPart: number
  hasPrev: boolean
  hasNext: boolean
  onPrev: () => void
  onNext: () => void
  onPick: (chapterId: string) => void
}

export function Switcher({
  part,
  inPart,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onPick,
}: SwitcherProps) {
  if (!part) return null

  return (
    <nav className='pointer-events-auto rounded-full border border-white/20 bg-white/10 p-1.5 shadow-sm backdrop-blur-md transition-colors hover:border-white/30'>
      <div className='flex items-center gap-2 sm:gap-3'>
        <ArrowButton
          direction='prev'
          disabled={!hasPrev}
          onClick={onPrev}
          label='Предыдущая глава'
        />

        <Indicators
          chapters={part.chapters}
          activeIndex={inPart}
          onPick={(index) => {
            const chapter = part.chapters[index]

            if (chapter) {
              onPick(chapter.id)
            }
          }}
        />

        <ArrowButton
          direction='next'
          disabled={!hasNext}
          onClick={onNext}
          label='Следующая глава'
        />
      </div>
    </nav>
  )
}
