'use client'

import { Button } from '@/shared/ui'
import { ChevronLeft, ChevronRight, HeartMinus, HeartPlus } from 'lucide-react'
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
    <div className='mt-5 flex w-full max-w-xs items-center justify-between'>
      <Button
        variant='glass'
        disabled={cardIndex === 0}
        onClick={() => handleClick('prev')}
      >
        <ChevronLeft />
      </Button>

      <Button variant='glass' className='pointer-events-none cursor-default'>
        {cardIndex + 1} из {totalCards + 1}
      </Button>

      <Button
        variant='glass'
        onClick={handleLikeClick}
        className='transition-transform duration-200 hover:scale-110'
      >
        {isLiked ? <HeartMinus /> : <HeartPlus />}
      </Button>

      <Button
        variant='glass'
        disabled={cardIndex === totalCards}
        onClick={() => handleClick('next')}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
