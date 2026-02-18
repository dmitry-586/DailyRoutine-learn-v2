import { NavAdmin } from '@/features/AdminPanel'
import type { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='flex flex-col flex-1'>
      <h2 className='text-center text-xl'>Админ панель</h2>
      <NavAdmin />
      {children}
    </div>
  )
}
