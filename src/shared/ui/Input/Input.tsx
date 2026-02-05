'use client'

import { cn } from '@/shared/lib'
import { Eye, EyeOff, type LucideIcon } from 'lucide-react'
import { forwardRef, InputHTMLAttributes, useId, useState } from 'react'

const INPUT_ICON = { size: 20, strokeWidth: 1.8 } as const

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperCN?: string
  inputCN?: string
  labelCN?: string
  errorCN?: string
  leftIcon?: LucideIcon
  leftIconCN?: string
  rightIcon?: LucideIcon
  rightIconCN?: string
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id: idProp,
    type,
    className,
    wrapperCN,
    inputCN,
    labelCN,
    errorCN,
    leftIconCN,
    rightIconCN,
    leftIcon,
    rightIcon,
    label,
    error,
    ...rest
  },
  ref,
) {
  const inputId = idProp ?? useId()
  const LeftIcon = leftIcon
  const RightIcon = rightIcon
  const isPassword = type === 'password'
  const [showPassword, setShowPassword] = useState(false)
  const hasRightSlot = isPassword || RightIcon

  return (
    <div className={cn('relative inline-flex flex-col gap-2 pb-3', wrapperCN)}>
      {label && (
        <label htmlFor={inputId} className={cn('text-primary', labelCN)}>
          {label}
        </label>
      )}
      <div className='bg-gray/60 hover:bg-gray/70 flex items-center rounded-2xl border border-white/10 px-4 py-3 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-white/30 active:bg-white/20'>
        {LeftIcon && (
          <LeftIcon
            {...INPUT_ICON}
            className={cn('text-primary', leftIconCN)}
          />
        )}
        <input
          ref={ref}
          id={inputId}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={cn(
            'flex-1 outline-none disabled:pointer-events-none disabled:opacity-50',
            leftIcon && 'pl-3',
            hasRightSlot && 'pr-3',
            inputCN,
            className,
          )}
          {...rest}
        />
        {isPassword ? (
          <button
            type='button'
            className={cn(
              'text-primary cursor-pointer hover:opacity-80',
              rightIconCN,
            )}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? (
              <Eye {...INPUT_ICON} />
            ) : (
              <EyeOff {...INPUT_ICON} />
            )}
          </button>
        ) : (
          RightIcon && (
            <RightIcon
              {...INPUT_ICON}
              className={cn('text-primary', rightIconCN)}
            />
          )
        )}
      </div>
      {error && (
        <p className={cn('absolute -bottom-3 text-sm text-red-500', errorCN)}>
          {error}
        </p>
      )}
    </div>
  )
})
