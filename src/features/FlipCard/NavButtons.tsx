import { Button } from '@/shared/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

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
  const handleClick = (variant: string) => {
    if (variant === 'next') {
      setCardIndex((prev) => prev + 1)
    }
    if (variant === 'prev') {
      setCardIndex((prev) => prev - 1)
    }
  }

  return (
    <div className='mt-5 flex justify-between'>
      <Button
        variant='glass'
        disabled={cardIndex === 0}
        onClick={() => handleClick('prev')}
      >
        <ChevronLeft />
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
