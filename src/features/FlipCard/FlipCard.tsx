'use client'

import { cn } from '@/shared/lib'
import { useState } from 'react'
import { Side } from './Side'

export interface FlipCardProps {
  type: string
  question: string
  answer: string
}

export function FlipCard({ type, question, answer }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        'relative mt-10 flex h-100 w-xs cursor-pointer justify-center transition-transform duration-500 transform-3d',
        isFlipped && 'rotate-y-180',
      )}
    >
      <Side group={type} title={question} variant='front' />
      <Side group='' title={answer} variant='back' />
    </div>
  )
}
