import { CategoryItem } from '@/shared/types'

export interface ICardData {
  id: string
  categoryId: string
  question: string
  answer: string
  difficulty: string
}

export interface CardWithCategory extends ICardData {
  categoryTitle: string
}

export interface FlipCardProps {
  filters: CategoryItem[]
}
