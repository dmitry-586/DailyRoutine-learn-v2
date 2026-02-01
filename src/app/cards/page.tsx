'use client'

import {
  CategoriesHeader,
  CategorySelection,
  FlipCard,
  useCategory,
  useSelectedCategories,
} from '@/features'
import { BackButton, Button } from '@/shared/ui'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'

export default function Cards() {
  const [isVisible, setIsVisible] = useState(false)

  const { categories, loading, error } = useCategory()
  const { categoryClick, filteredCategories } = useSelectedCategories()

  const handleStart = () => {
    if (filteredCategories.length) setIsVisible(true)
  }

  return (
    <section className='flex flex-1 flex-col'>
      {!isVisible ? (
        <>
          <CategoriesHeader />
          <CategorySelection
            categories={categories}
            loading={loading}
            error={error}
            filteredCategories={filteredCategories}
            onCategoryClick={categoryClick}
            onStart={handleStart}
          />
        </>
      ) : (
        <FlipCard filters={filteredCategories} />
      )}
      <div className='sticky bottom-5 left-0 z-10'>
        {isVisible ? (
          <Button variant='glass' onClick={() => setIsVisible(false)}>
            <ChevronLeft />
          </Button>
        ) : (
          <BackButton />
        )}
      </div>
    </section>
  )
}
