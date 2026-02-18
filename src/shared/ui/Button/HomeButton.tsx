'use client'

import { Button } from '@/shared/ui'
import { House } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ButtonHTMLAttributes } from 'react'

export function HomeButton({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  return (
    <Button
      {...rest}
      className={className}
      variant='glass'
      onClick={handleBack}
    >
      <House />
    </Button>
  )
}
