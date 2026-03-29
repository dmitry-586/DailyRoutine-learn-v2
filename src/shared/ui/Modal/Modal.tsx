'use client'

import { cn } from '@/shared/lib'
import { X } from 'lucide-react'
import { ReactNode, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  className?: string
  wrapperCN?: string
}

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  wrapperCN,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)

  const titleId = useId()
  const contentId = useId()

  useEffect(() => {
    if (!isOpen) return

    prevFocusRef.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'

    modalRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      prevFocusRef.current?.focus()
    }
  }, [isOpen])

  const focusFirst = () => {
    const nodes = modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
    nodes?.[0]?.focus()
  }

  const focusLast = () => {
    const nodes = modalRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
    nodes?.[nodes.length - 1]?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') onClose()
  }

  if (!isOpen) return null

  const content = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm',
        wrapperCN,
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <span
        tabIndex={0}
        aria-hidden='true'
        onFocus={focusLast}
        className='sr-only'
      />

      <div
        ref={modalRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={contentId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          'bg-background relative flex max-h-[90vh] w-full max-w-2xl flex-col gap-3 overflow-y-auto rounded-2xl border border-white/10 px-5 py-5 shadow-xl focus:outline-none',
          className,
        )}
      >
        <header className='flex items-center justify-between'>
          {title && (
            <h3 id={titleId} className='font-bold text-white md:text-lg'>
              {title}
            </h3>
          )}

          <button
            onClick={onClose}
            aria-label='Close modal'
            className='ml-auto cursor-pointer rounded-full p-1 transition-colors duration-200 hover:bg-white/10'
          >
            <X size={24} />
          </button>
        </header>

        <section className='flex flex-1 flex-col' id={contentId}>
          {children}
        </section>
      </div>

      <span
        tabIndex={0}
        aria-hidden='true'
        onFocus={focusFirst}
        className='sr-only'
      />
    </div>
  )

  return createPortal(content, document.body)
}
