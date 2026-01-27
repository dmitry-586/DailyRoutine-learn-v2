import { cn } from '@/shared/lib'

interface SideProps {
  title: string
  variant?: 'front' | 'back'
}

export function Side({ title, variant = 'front' }: SideProps) {
  return (
    <div
      className={cn(
        'bg-muted absolute h-full w-full rounded-2xl border border-white/10 px-4 py-6 shadow-sm transition-all duration-300 backface-hidden',
        'flex flex-col items-center justify-center text-center',
        'hover:border-primary/50 hover:shadow-lg',
        variant === 'back' && 'rotate-y-180',
      )}
    >
      <h3 className='text-lg text-white/80'>{title}</h3>
      <p className='mt-4 text-sm text-white/50'>
        {variant === 'front' ? 'Посмотреть ответ ' : 'Нажмите чтобы вернуться'}
      </p>
    </div>
  )
}
