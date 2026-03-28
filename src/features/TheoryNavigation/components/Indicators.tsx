import type { Part } from '@/services'
import { cn } from '@/shared/lib'

interface IndicatorsProps {
  chapters: Part['chapters']
  activeIndex: number
  onPick: (index: number) => void
}

export function Indicators({ chapters, activeIndex, onPick }: IndicatorsProps) {
  return (
    <div className='flex max-w-[40vw] gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
      {chapters.map((chapter, index) => (
        <button
          type='button'
          key={chapter.id}
          onClick={() => onPick(index)}
          className={cn(
            'h-1.5 rounded-full transition-all',
            index === activeIndex
              ? 'bg-primary w-6 shadow-sm'
              : 'w-1.5 bg-white/30 hover:bg-white/50',
          )}
          aria-label={`Перейти к главе ${index + 1}`}
        />
      ))}
    </div>
  )
}
