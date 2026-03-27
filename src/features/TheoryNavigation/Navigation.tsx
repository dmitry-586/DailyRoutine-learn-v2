'use client'

import { BurgerButton } from '@/features/Header'
import { HomeButton } from '@/shared/ui'
import { Overlay } from './components/Overlay'
import { Switcher } from './components/Switcher'
import { useNav } from './hooks/useNav'

export function Navigation() {
  const { view, actions } = useNav()

  return (
    <>
      <Overlay
        open={view.menuOpen}
        parts={view.parts}
        chapterId={view.chapterId}
        onPick={actions.goTo}
      />

      <div className='pointer-events-none sticky bottom-5 left-0 z-20 mt-4 flex w-full items-end justify-between gap-3'>
        <div className='pointer-events-auto flex gap-3 sm:gap-5'>
          <HomeButton className='size-11 p-2.5' />
          <BurgerButton
            className='size-11 p-2.5'
            isOpen={view.menuOpen}
            onClick={actions.toggleMenu}
          />
        </div>

        {!view.menuOpen && (
          <div className='pointer-events-auto'>
            <Switcher view={view} actions={actions} />
          </div>
        )}
      </div>
    </>
  )
}
