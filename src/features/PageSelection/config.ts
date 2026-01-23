import {
  BookCopy,
  BookOpenCheck,
  BookText,
  Code,
  Headphones,
} from 'lucide-react'
import type { LinkProps } from './types'

export const pageLinks: LinkProps[] = [
  {
    id: 1,
    title: 'Теория',
    description: 'Изучайте теорию по главам',
    href: '/theory',
    icon: BookText,
  },
  {
    id: 2,
    title: 'Карточки',
    description: 'Запоминайте с помощью карточек',
    href: '/cards',
    icon: BookCopy,
  },
  {
    id: 3,
    title: 'Практика',
    description: 'Решайте практические задания',
    href: '/practice',
    icon: Code,
  },
  {
    id: 4,
    title: 'Тесты',
    description: 'Проверьте свои знания',
    href: '/quiz',
    icon: BookOpenCheck,
  },
  {
    id: 5,
    title: 'Подкасты',
    description: 'Слушайте образовательные подкасты',
    href: '/podcasts',
    icon: Headphones,
  },
]
