'use client'

import { cn } from '@/shared/lib'
import {
  Textarea as HeadlessTextarea,
  type TextareaProps as HeadlessTextareaProps,
} from '@headlessui/react'
import { forwardRef, useId } from 'react'

interface TextareaProps extends HeadlessTextareaProps {
  label?: string
  error?: string
  wrapperCN?: string
  labelCN?: string
  errorCN?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, wrapperCN, labelCN, errorCN, ...props }, ref) => {
    const id = useId()

    return (
      <div className={cn('relative flex flex-col gap-2 pb-5', wrapperCN)}>
        {label && (
          <label htmlFor={id} className={cn('text-primary text-sm', labelCN)}>
            {label}
          </label>
        )}
        <HeadlessTextarea
          ref={ref}
          id={id}
          className={cn(
            'bg-gray/60 hover:bg-gray/70 min-h-60 w-full rounded-2xl border border-white/10 p-3 text-sm backdrop-blur-md transition-all duration-300 outline-none hover:border-white/30 focus:border-white/40 disabled:pointer-events-none disabled:opacity-50',
            className,
          )}
          {...props}
        />
        {error && (
          <p className={cn('absolute bottom-0 text-xs text-red-500', errorCN)}>
            {error}
          </p>
        )}
      </div>
    )
  },
)
