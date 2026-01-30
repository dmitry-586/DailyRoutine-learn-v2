'use client'

import { cn } from '@/shared/lib'
import { CategoryItem } from '@/shared/types'
import { Button } from '@/shared/ui'

interface CategoryProps {
  category: CategoryItem
  isSelected: boolean
  onClick: () => void
}

export function Category({ category, isSelected, onClick }: CategoryProps) {
  return (
    <Button
      onClick={onClick}
      variant='glass'
      className={cn(
        'mx-auto w-full max-w-md rounded-2xl px-6 py-5 sm:max-w-none md:text-base',
        isSelected
          ? 'bg-primary/30 text-primary hover:bg-primary/40 border-primary active:bg-primary/30'
          : 'bg-gray/50 hover:bg-gray/80',
      )}
    >
      {category.title}
    </Button>
  )
}
