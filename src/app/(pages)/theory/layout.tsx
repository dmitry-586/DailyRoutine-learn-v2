import { TheoryNavigation } from '@/features'
import type { PropsWithChildren } from 'react'

export default function TheoryLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <section className='flex flex-1 flex-col'>{children}</section>
      <TheoryNavigation />
    </>
  )
}
