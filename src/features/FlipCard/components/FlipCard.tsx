'use client'

import { cn } from '@/shared/lib'
import { useEffect, useState } from 'react'
import { FlipCardProps } from '../types'
import { useCards } from '../useCards'
import { CardSkeleton } from './CardSkeleton'
import { NavButtons } from './NavButtons'
import { Side } from './Side'

export function FlipCard({ filters }: FlipCardProps) {
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null)

  const { cardData, cardIndex, currentCard, setCardIndex, loading } = useCards({
    filters,
  })

  const isFlipped = flippedCardIndex === cardIndex

  useEffect(() => {
    setFlippedCardIndex(null)
  }, [cardIndex])

  const handleFlip = () => {
    setFlippedCardIndex((prev) => (prev === cardIndex ? null : cardIndex))
  }

  if (loading) return <CardSkeleton />

  if (!currentCard) {
    return (
      <section className='flex flex-1 flex-col items-center justify-center'>
        <p className='text-white/60'>
          В выбранных категориях пока нет карточек
        </p>
      </section>
    )
  }

  return (
    <section className='flex flex-1 flex-col items-center'>
      <button
        key={cardIndex}
        onClick={handleFlip}
        className={cn(
          'relative mt-10 flex min-h-100 w-full max-w-xs cursor-pointer justify-center transition-transform duration-500 transform-3d',
          isFlipped && 'rotate-y-180',
        )}
      >
        <Side
          group={currentCard.categoryTitle}
          title={currentCard.question}
          variant='front'
        />
        <Side title={currentCard.answer} variant='back' />
      </button>
      <NavButtons
        cardIndex={cardIndex}
        setCardIndex={setCardIndex}
        totalCards={Math.max(0, cardData.length - 1)}
      />
    </section>
  )
}
