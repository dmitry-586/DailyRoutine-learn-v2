import { cn } from '@/shared/lib'

const SKELETON_COUNT = 6

interface LoaderProps {
  className?: string
  count?: number
}

export function CategorySkeleton({ className, count = SKELETON_COUNT }: LoaderProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
      aria-label='Загрузка категорий'
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className='h-15.5 animate-pulse rounded-2xl border-2 border-white/10 bg-white/5'
        />
      ))}
    </div>
  )
}
