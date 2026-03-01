import type { LucideIcon } from 'lucide-react'

interface BasePageLink {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export type CardProps = BasePageLink

export interface LinkProps extends BasePageLink {
  id: number
}
