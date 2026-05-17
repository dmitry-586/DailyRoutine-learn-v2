'use client'

import { cn } from '@/shared/lib'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AdminLinksProps {
  id: number
  href: string
  title: string
}

const AdminLinks: AdminLinksProps[] = [
  {
    id: 1,
    href: '/admin/theory',
    title: 'Web-разработка',
  },
  // {
  //   id: 2,
  //   href: '/admin/cards',
  //   title: 'Карточки',
  // },
  // {
  //   id: 3,
  //   href: '/admin/podcasts',
  //   title: 'Подкасты',
  // },
  {
    id: 4,
    href: '/admin/figma',
    title: 'Figma',
  },
]

export function NavAdmin() {
  const pathname = usePathname()

  return (
    <nav className='mt-5 flex justify-center gap-5'>
      {AdminLinks.map((el) => {
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
            <h3 className='font-medium'>{el.title}</h3>
          </Link>
        )
      })}
    </nav>
  )
}
