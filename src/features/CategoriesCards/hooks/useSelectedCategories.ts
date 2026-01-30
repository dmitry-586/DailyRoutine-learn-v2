'use client'

import { CategoryItem } from '@/shared/types'
import { useState } from 'react'

export function useSelectedCategories() {
  const [filteredCategories, setFilteredCategories] = useState<CategoryItem[]>(
    [],
  )

  const categoryClick = (category: CategoryItem) => {
    setFilteredCategories((prev) =>
      prev.some((e) => e.id === category.id)
        ? prev.filter((e) => e.id !== category.id)
        : [...prev, category],
    )
  }

  return { filteredCategories, categoryClick }
}
