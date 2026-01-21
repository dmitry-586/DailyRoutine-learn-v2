import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface BasePageLink {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export interface CardProps extends BasePageLink {
  children?: ReactNode
}

export interface LinkProps extends BasePageLink {
  id: number
}
