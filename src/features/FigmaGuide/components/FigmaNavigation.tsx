'use client'

import { BurgerButton } from '@/features/Header'
import { Switcher } from '@/features/TheoryNavigation/components/Switcher'
import { useFigmaChapters } from '@/services/figma'
import { useFigmaStore } from '@/services/stores/figmaStore'
import type { FigmaChapter, Part } from '@/services/types'
import { sortByOrder } from '@/shared/lib'
import { HomeButton } from '@/shared/ui'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

function chapterIdFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const figmaIndex = segments.indexOf('figma')

  if (figmaIndex === -1) return ''

  return segments[figmaIndex + 1] ?? ''
}

function getNavPosition(chapters: FigmaChapter[], chapterId: string) {
  const inPart = chapters.findIndex((chapter) => chapter.id === chapterId)

  if (inPart === -1) {
    return {
      inPart: null,
      prevChapterId: null,
      nextChapterId: null,
    }
  }

  return {
    inPart,
    prevChapterId: chapters[inPart - 1]?.id ?? null,
    nextChapterId: chapters[inPart + 1]?.id ?? null,
  }
}

export function FigmaNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const setCurrentChapter = useFigmaStore((state) => state.setCurrentChapter)
  const { chapters: rawChapters } = useFigmaChapters()

  const chapters = useMemo(() => sortByOrder(rawChapters), [rawChapters])
  const chapterId = chapterIdFromPath(pathname)

  const { inPart, prevChapterId, nextChapterId } = useMemo(
    () => getNavPosition(chapters, chapterId),
    [chapters, chapterId],
  )

  const part = useMemo<Part | null>(() => {
    if (chapters.length === 0) return null

    return {
      id: 'figma',
      title: 'Figma',
      order: 1,
      chapters,
    }
  }, [chapters])

  useEffect(() => {
    if (chapterId) {
      setCurrentChapter(chapterId)
    }
  }, [chapterId, setCurrentChapter])

  const goTo = (id: string) => {
    if (!id) return

    setMenuOpen(false)

    if (id === chapterId) return

    router.push(`/figma/${id}`)
  }

  const prev = () => {
    if (prevChapterId) {
      goTo(prevChapterId)
    }
  }

  const next = () => {
    if (nextChapterId) {
      goTo(nextChapterId)
    }
  }

  return (
    <>
      <FigmaOverlay
        open={menuOpen}
        chapters={chapters}
        chapterId={chapterId}
        onPick={goTo}
      />

      <div className='pointer-events-none sticky bottom-5 left-0 z-20 mt-4 flex w-full items-end justify-between gap-3'>
        <div className='pointer-events-auto flex gap-3 sm:gap-5'>
          <HomeButton className='size-11 p-2.5' />
          <BurgerButton
            className='size-11 p-2.5'
            isOpen={menuOpen}
            onClick={() => setMenuOpen((prevState) => !prevState)}
          />
        </div>

        {!menuOpen && part && inPart !== null && (
          <Switcher
            part={part}
            inPart={inPart}
            hasPrev={Boolean(prevChapterId)}
            hasNext={Boolean(nextChapterId)}
            onPrev={prev}
            onNext={next}
            onPick={goTo}
          />
        )}
      </div>
    </>
  )
}

interface FigmaOverlayProps {
  open: boolean
  chapters: FigmaChapter[]
  chapterId: string
  onPick: (chapterId: string) => void
}

function FigmaOverlay({
  open,
  chapters,
  chapterId,
  onPick,
}: FigmaOverlayProps) {
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
          <div className='flex flex-col gap-3'>
            <h3 className='text-foreground font-semibold sm:text-lg'>
              Методичка Figma
            </h3>

            <ul className='border-gray ml-2 flex flex-col gap-1 border-l sm:ml-4 sm:pl-4'>
              {chapters.map((chapter) => {
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
        </nav>
      </div>
    </section>
  )
}
