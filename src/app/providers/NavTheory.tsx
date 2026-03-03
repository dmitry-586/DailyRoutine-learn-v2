'use client'

import { BurgerButton } from '@/features'
import { useParts } from '@/services/theory'
import { HomeButton } from '@/shared/ui'
import Link from 'next/link'
import { useState } from 'react'

export function NavTheory() {
  const [isOpen, setIsOpen] = useState(false)
  const { parts } = useParts()

  return (
    <>
      {isOpen && (
        <section className='bg-background fixed inset-0 z-10 p-4'>
          <h2 className='text-xl'>Оглавление</h2>
          <nav className='mt-4 flex flex-col gap-5 border-t pt-4'>
            {parts.map((part) => (
              <div key={part.id} className='flex flex-col gap-2'>
                <h3>
                  Часть {part.order} - {part.title}
                </h3>
                <ul className='ml-10 flex list-disc flex-col gap-1'>
                  {part.chapters.map((chapter) => (
                    <Link
                      key={chapter.id}
                      href={`/theory/${chapter.id}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {chapter.title}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </section>
      )}
      <div className='sticky bottom-5 left-0 z-20 flex gap-3 sm:gap-5'>
        <HomeButton className='size-10 p-2.5' />
        <BurgerButton
          className='size-10 p-2.5'
          isOpen={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
    </>
  )
}
