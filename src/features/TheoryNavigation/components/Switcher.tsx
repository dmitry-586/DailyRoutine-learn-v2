import type { NavActions, NavView } from '../types'
import { ArrowButton } from './ArrowButton'
import { Indicators } from './Indicators'

interface SwitcherProps {
  view: Pick<NavView, 'part' | 'inPart' | 'hasPrev' | 'hasNext'>
  actions: Pick<NavActions, 'prev' | 'next' | 'goToInPart'>
}

export function Switcher({ view, actions }: SwitcherProps) {
  const part = view.part

  if (!part) return null

  return (
    <nav className='rounded-full border border-white/20 bg-white/10 p-1.5 shadow-sm backdrop-blur-md transition-colors hover:border-white/30'>
      <div className='flex items-center gap-2 sm:gap-3'>
        <ArrowButton
          direction='prev'
          disabled={!view.hasPrev}
          onClick={actions.prev}
          label='Предыдущая глава'
        />

        <Indicators
          chapters={part.chapters}
          activeIndex={view.inPart}
          onPick={(index) => actions.goToInPart(part.id, index)}
        />

        <ArrowButton
          direction='next'
          disabled={!view.hasNext}
          onClick={actions.next}
          label='Следующая глава'
        />
      </div>
    </nav>
  )
}
