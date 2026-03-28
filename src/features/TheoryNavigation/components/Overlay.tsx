import type { Part } from '@/services'
import { useEffect, useRef } from 'react'

interface OverlayProps {
  open: boolean
  parts: Part[]
  chapterId: string
  onPick: (chapterId: string) => void
}

export function Overlay({ open, parts, chapterId, onPick }: OverlayProps) {
  const activeChapterRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open || !activeChapterRef.current) return

    activeChapterRef.current.scrollIntoView({ block: 'center' })
  }, [open, chapterId])

  if (!open) return null

  return (
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
                  const active = chapter.id === chapterId

                  return (
                    <li key={chapter.id} className='relative'>
                      {active && (
                        <span className='bg-primary absolute h-full w-0.5 rounded-full sm:top-1 sm:-left-[17.5px] sm:h-5' />
                      )}
                      <button
                        type='button'
                        onClick={() => onPick(chapter.id)}
                        ref={active ? activeChapterRef : null}
                        className={`block w-full rounded-r-md px-2 py-1 text-left text-sm transition sm:rounded-md ${
                          active
                            ? 'bg-muted text-primary font-medium'
                            : 'text-light-gray hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        Глава {chapter.order}. {chapter.title}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </section>
  )
}
