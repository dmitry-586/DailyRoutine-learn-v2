import { Header } from '@/features'
import type { PropsWithChildren } from 'react'

export function MainLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='mx-auto flex h-full min-h-screen w-full max-w-7xl flex-col px-3'>
      <Header />
      <main className='flex min-h-0 flex-1 flex-col'>{children}</main>
    </div>
  )
}
