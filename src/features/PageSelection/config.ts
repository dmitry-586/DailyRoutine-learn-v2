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
    title: 'Теория',
    description: 'Конспекты и материалы',
    href: '/theory',
    icon: BookText,
  },
  {
    id: 2,
    title: 'Карточки',
    description: 'Интерактивное запоминание',
    href: '/cards',
    icon: BookCopy,
  },
  {
    id: 3,
    title: 'Практика',
    description: 'Задачи с самопроверкой',
    href: '/practice',
    icon: Code,
  },
  {
    id: 4,
    title: 'Тесты',
    description: 'Проверка знаний',
    href: '/quiz',
    icon: BookOpenCheck,
  },
  {
    id: 5,
    title: 'Подкасты',
    description: 'Объяснения в аудиоформате',
    href: '/podcasts',
    icon: Headphones,
  },
  {
    id: 6,
    title: 'Roadmap',
    description: 'План развития',
    href: '/roadmap',
    icon: Component,
  },
]
