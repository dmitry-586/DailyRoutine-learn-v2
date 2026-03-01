import Link from 'next/link'
import type { CardProps } from './types'

export function Card({ href, title, description, icon: Icon }: CardProps) {
  return (
    <Link
      href={href}
      className='group bg-gray/40 hover:border-primary/50 hover:bg-gray/60 relative mx-auto flex w-full max-w-md flex-col rounded-2xl border border-white/10 px-3 py-4 shadow-sm transition-all duration-300 hover:shadow-lg sm:px-6'
    >
      <div className='flex items-center gap-2'>
        <div className='bg-primary/20 text-primary group-hover:bg-primary/30 flex size-8 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 md:size-10'>
          <Icon className='size-4 md:size-5' />
        </div>
        <h3 className='font-medium md:text-lg'>{title}</h3>
      </div>
      <p className='text-light-gray mt-2 text-sm md:text-base'>{description}</p>
    </Link>
  )
}
