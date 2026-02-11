'use client'

import { Button } from '@/shared/ui'
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

interface NavButtonsProps {
  cardIndex: number
  totalCards: number
  setCardIndex: Dispatch<SetStateAction<number>>
}

export function NavButtons({
  cardIndex,
  setCardIndex,
  totalCards,
}: NavButtonsProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleClick = (variant: 'next' | 'prev') => {
    setCardIndex((prev) => prev + (variant === 'next' ? 1 : -1))
  }

  const handleLikeClick = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className='mt-5 flex w-full max-w-sm items-center justify-between'>
      <Button
        variant='glass'
        disabled={cardIndex === 0}
        onClick={() => handleClick('prev')}
      >
        <ArrowLeft />
      </Button>

      <Button
        variant='glass'
        className='pointer-events-none cursor-default px-4'
      >
        {cardIndex + 1} из {totalCards + 1}
      </Button>

      <Button
        variant='glass'
        className={`${isLiked ? 'bg-primary hover:bg-primary/80 active:bg-primary' : ''}`}
        onClick={handleLikeClick}
      >
        <Heart />
      </Button>

      <Button
        variant='glass'
        disabled={cardIndex === totalCards}
        onClick={() => handleClick('next')}
      >
        <ArrowRight />
      </Button>
    </div>
  )
}
