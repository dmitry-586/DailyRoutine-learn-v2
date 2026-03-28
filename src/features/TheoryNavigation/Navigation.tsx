'use client'

import { BurgerButton } from '@/features/Header'
import { HomeButton } from '@/shared/ui'
import { Overlay } from './components/Overlay'
import { Switcher } from './components/Switcher'
import { useNav } from './hooks/useNav'

export function Navigation() {
  const {
    menuOpen,
    parts,
    chapterId,
    part,
    inPart,
    hasPrev,
    hasNext,
    toggleMenu,
    goTo,
    prev,
    next,
  } = useNav()

  return (
    <>
      <Overlay open={menuOpen} parts={parts} chapterId={chapterId} onPick={goTo} />

      <div className='pointer-events-none sticky bottom-5 left-0 z-20 mt-4 flex w-full items-end justify-between gap-3'>
        <div className='pointer-events-auto flex gap-3 sm:gap-5'>
          <HomeButton className='size-11 p-2.5' />
          <BurgerButton
            className='size-11 p-2.5'
            isOpen={menuOpen}
            onClick={toggleMenu}
          />
        </div>

        {!menuOpen && part && inPart !== null && (
          <Switcher
            part={part}
            inPart={inPart}
            hasPrev={hasPrev}
            hasNext={hasNext}
            onPrev={prev}
            onNext={next}
            onPick={goTo}
          />
        )}
      </div>
    </>
  )
}
