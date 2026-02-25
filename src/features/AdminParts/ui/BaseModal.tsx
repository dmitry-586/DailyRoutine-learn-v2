import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode } from 'react'

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function BaseModal({
  isOpen,
  onClose,
  title,
  children,
}: BaseModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
      <section className='fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4'>
        <DialogPanel className='bg-background max-h-[95vh] w-full max-w-md overflow-auto rounded-xl border border-white/20 p-6 shadow-sm'>
          <DialogTitle className='font-semibold'>{title}</DialogTitle>
          {children}
        </DialogPanel>
      </section>
    </Dialog>
  )
}
