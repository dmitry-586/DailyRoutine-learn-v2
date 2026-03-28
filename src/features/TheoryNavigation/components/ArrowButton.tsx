import { cn } from '@/shared/lib'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ArrowButtonProps {
  direction: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
  label: string
}

export function ArrowButton({
  direction,
  disabled,
  onClick,
  label,
}: ArrowButtonProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        'flex size-8 cursor-pointer items-center justify-center rounded-full transition-all',
        disabled
          ? 'text-light-gray/30 cursor-not-allowed bg-white/10'
          : 'bg-primary/90 text-foreground hover:bg-primary shadow-md active:scale-95',
      )}
    >
      <Icon className='size-6' />
    </button>
  )
}
