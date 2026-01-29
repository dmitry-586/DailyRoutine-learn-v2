import { Button } from '@/shared/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

interface NavButtonsProps {
  cardIndex: number
  totalCards: number
  setCardIndex: Dispatch<SetStateAction<number>>
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

export function NavButtons({
  cardIndex,
  setCardIndex,
  totalCards,
  setIsVisible
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
    <div className='mt-5 flex justify-between items-center'>
      <Button
        variant='glass'
        disabled={cardIndex === 0}
        onClick={() => handleClick('prev')}
      >
        <ChevronLeft />
      </Button>
      <Button onClick={() => setIsVisible(false)}>Вернуться к выбору тем</Button>
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
