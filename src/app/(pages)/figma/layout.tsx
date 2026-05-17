import { FigmaNavigation } from '@/features/FigmaGuide'
import type { PropsWithChildren } from 'react'

export default function FigmaLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <section className='flex flex-1 flex-col'>{children}</section>
      <FigmaNavigation />
    </>
  )
}
