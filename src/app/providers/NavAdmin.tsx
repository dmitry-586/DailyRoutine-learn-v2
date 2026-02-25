'use client'

import { cn } from '@/shared/lib'
import { BookCopy, BookText, Headphones, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AdminLinksProps {
  id: number
  href: string
  title: string
  icon: LucideIcon
}

const AdminLinks: AdminLinksProps[] = [
  {
    id: 1,
    href: '/admin/theory',
    title: 'Теория',
    icon: BookText,
  },
  {
    id: 2,
    href: '/admin/cards',
    title: 'Карточки',
    icon: BookCopy,
  },
  {
    id: 3,
    href: '/admin/podcasts',
    title: 'Подкасты',
    icon: Headphones,
  },
]

export function NavAdmin() {
  const pathname = usePathname()

  return (
    <nav className='mt-5 flex justify-center gap-5'>
      {AdminLinks.map((el) => {
        const Icon = el.icon
        return (
          <Link
            key={el.id}
            href={el.href}
            className={cn(
              'bg-gray/40 hover:border-primary/50 hover:bg-gray/60 flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm shadow-sm transition-all duration-300 hover:shadow-lg',
              pathname === el.href &&
                'border-primary/50 bg-primary/20 hover:bg-primary/30 transition-colors duration-200',
            )}
          >
            <Icon className='size-4' />
            <h3 className='font-medium'>{el.title}</h3>
          </Link>
        )
      })}
    </nav>
  )
}
