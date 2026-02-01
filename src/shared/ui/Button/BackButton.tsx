'use client'

import { Button } from '@/shared/ui'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ButtonHTMLAttributes } from 'react'

export function BackButton({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Button
      {...rest}
      className={className}
      variant='glass'
      onClick={handleBack}
    >
      <ChevronLeft />
    </Button>
  )
}
