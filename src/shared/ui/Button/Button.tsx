import { cn } from '@/shared/lib'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'glass' | 'red'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center text-sm font-medium transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50',
          variant === 'default' &&
            'bg-primary hover:bg-primary/80 active:bg-primary border-primary gap-2 rounded-2xl border-2 px-4 py-2 text-white',
          variant === 'primary' &&
            'border-primary text-primary hover:bg-primary/10 active:bg-primary/30 gap-2 rounded-2xl border-2 bg-transparent px-4 py-2',
          variant === 'glass' &&
            'rounded-full border border-white/20 bg-white/10 p-3 shadow-sm backdrop-blur-md hover:border-white/30 hover:bg-white/15 active:bg-white/20',
          variant === 'red' &&
            'gap-2 rounded-2xl border-2 border-red-500/80 bg-transparent px-4 py-2 text-red-500/80 hover:bg-red-500/10 active:bg-red-500/20',
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
