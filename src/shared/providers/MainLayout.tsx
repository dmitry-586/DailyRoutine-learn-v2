import { Footer } from '@/features/Footer'
import { Header } from '@/features/Header'
import type { PropsWithChildren } from 'react'

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='mx-auto flex h-full min-h-screen w-full max-w-7xl flex-col px-3'>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  )
}
