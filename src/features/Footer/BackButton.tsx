'use client'

import { Button } from '@/shared/ui'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Button variant='glass' onClick={handleBack}>
      <ArrowLeft />
    </Button>
  )
}
