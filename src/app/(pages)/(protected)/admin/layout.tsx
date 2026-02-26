import { NavAdmin } from '@/app/providers'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='mt-5 flex flex-1 flex-col'>
      <h2 className='text-center text-lg sm:text-xl'>Админ панель</h2>
      <NavAdmin />
      {children}
    </div>
  )
}
