'use client'

import { api } from '@/shared/lib'
import { useEffect, useState } from 'react'
import { CardWithCategory, FlipCardProps, ICardData } from './types'

export function useCards({ filters }: FlipCardProps) {
  const [cardData, setCardData] = useState<CardWithCategory[]>([])
  const [cardIndex, setCardIndex] = useState(0)
  const [loading, setLoading] = useState(() => filters.length > 0)

  useEffect(() => {
    if (!filters.length) {
      setCardData([])
      setCardIndex(0)
      setLoading(false)
      return
    }
    let cancelled = false
    Promise.all(
      filters.map((cat) =>
        api.get<ICardData[]>(`/card?categoryId=${cat.id}`).then(({ data }) => ({
          data: Array.isArray(data) ? data : [],
          title: cat.title,
        })),
      ),
    ).then((responses) => {
      if (cancelled) return
      const merged: CardWithCategory[] = responses.flatMap(({ data, title }) =>
        data.map((card) => ({ ...card, categoryTitle: title })),
      )
      setCardData(merged)
      setCardIndex(0)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [filters])

  const currentCard = cardData[Math.min(cardIndex, cardData.length - 1)]

  return { cardData, currentCard, cardIndex, setCardIndex, loading }
}
