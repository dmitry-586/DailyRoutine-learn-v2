'use client'

import { BurgerButton } from '@/features'
import { useParts } from '@/services/theory'
import { HomeButton } from '@/shared/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function NavTheory() {
  const [isOpen, setIsOpen] = useState(false)
  const { parts } = useParts()
  const pathname = usePathname()
  const currentChapter = pathname.split('/theory/')[1]

  return (
    <>
      {isOpen && (
        <section className='bg-background fixed inset-0 z-10 overflow-y-auto px-3 py-6 sm:p-6'>
          <div className='mx-auto max-w-2xl'>
            <h2 className='text-foreground text-xl font-semibold sm:text-2xl'>
              Оглавление
            </h2>

            <nav className='border-gray mt-3 flex flex-col gap-5 border-t pt-3 sm:mt-6 sm:gap-10 sm:pt-6'>
              {parts.map((part) => (
                <div key={part.id} className='flex flex-col gap-3'>
                  <h3 className='text-foreground font-semibold sm:text-lg'>
                    Часть {part.order}. {part.title}
                  </h3>

                  <ul className='border-gray ml-2 flex flex-col gap-1 border-l sm:ml-4 sm:pl-4'>
                    {part.chapters.map((chapter) => {
                      const isActive = chapter.id === currentChapter

                      return (
                        <li key={chapter.id} className='relative'>
                          {isActive && (
                            <span className='bg-primary absolute h-full w-0.5 rounded-full sm:top-1 sm:-left-[17.5px] sm:h-5' />
                          )}

                          <Link
                            href={`/theory/${chapter.id}`}
                            onClick={() => setIsOpen(false)}
                            className={`block rounded-r-md px-2 py-1 text-sm transition sm:rounded-md ${
                              isActive
                                ? 'bg-muted text-primary font-medium'
                                : 'text-light-gray hover:bg-muted hover:text-foreground'
                            } `}
                          >
                            Глава {chapter.order}. {chapter.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </section>
      )}
      <div className='sticky bottom-5 left-0 z-20 flex gap-3 sm:gap-5'>
        <HomeButton className='size-11 p-2.5' />
        <BurgerButton
          className='size-11 p-2.5'
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
    </>
  )
}
