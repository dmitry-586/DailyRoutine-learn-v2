import { Loader2 } from 'lucide-react'

interface LoaderProps {
  className?: string
  size?: number
}

export function Loader({ className, size = 40 }: LoaderProps) {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <Loader2
        size={size}
        className={`text-primary animate-spin ${className || ''}`}
      />
    </div>
  )
}
