import Link from 'next/link'
import type { CardProps } from './types'

export function Card({
  href,
  title,
  description,
  icon: Icon,
  children,
}: CardProps) {
  return (
    <Link
      href={href}
      className='group bg-gray/40 hover:border-primary/50 hover:bg-gray/60 relative mx-auto flex w-full max-w-md flex-col rounded-2xl border border-white/10 px-4 py-6 shadow-sm transition-all duration-300 hover:shadow-lg md:px-6'
    >
      <div className='mb-3 flex items-center gap-3'>
        <div className='bg-primary/20 text-primary group-hover:bg-primary/30 flex size-10 shrink-0 items-center justify-center rounded-2xl transition-all duration-300'>
          <Icon className='size-5' />
        </div>
        <h3 className='text-xl font-medium'>{title}</h3>
      </div>
      <p className='text-light-gray'>{description}</p>
      {children && <div className='mt-3'>{children}</div>}
    </Link>
  )
}
