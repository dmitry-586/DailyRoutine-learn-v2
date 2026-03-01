import {
  BookCopy,
  BookOpenCheck,
  BookText,
  Code,
  Component,
  Headphones,
} from 'lucide-react'
import type { LinkProps } from './types'

export const pageLinks: LinkProps[] = [
  {
    id: 1,
    title: 'Теория Web',
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
    description: 'Слушайте AI-подкасты',
    href: '/podcasts',
    icon: Headphones,
  },
  {
    id: 6,
    title: 'Roadmap',
    description: 'Посмотрите свой путь в разработке',
    href: '/podcasts',
    icon: Component,
  },
]
