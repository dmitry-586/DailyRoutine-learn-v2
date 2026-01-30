import { CategoryItem } from '@/shared/types'
import { Button } from '@/shared/ui'
import { CategorySkeleton } from './CategorySkeleton'
import { Category } from './Category'

interface CategorySelectionProps {
  categories: CategoryItem[]
  loading: boolean
  error: string
  filteredCategories: CategoryItem[]
  onCategoryClick: (category: CategoryItem) => void
  onStart: () => void
}

export function CategorySelection({
  categories,
  loading,
  error,
  filteredCategories,
  onCategoryClick,
  onStart,
}: CategorySelectionProps) {
  return (
    <section className='mt-5 flex flex-1 flex-col'>
      {loading ? (
        <CategorySkeleton />
      ) : error ? (
        <p className='text-red-500/80'>{error}</p>
      ) : (
        <>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {categories.map((category) => (
              <Category
                key={category.id}
                category={category}
                isSelected={filteredCategories.some(
                  (e) => e.id === category.id,
                )}
                onClick={() => onCategoryClick(category)}
              />
            ))}
          </div>
          {categories.length > 0 && (
            <Button
              className='sticky bottom-5 mt-10 ml-auto rounded-xl px-6 py-2.5 text-base'
              onClick={onStart}
              disabled={!filteredCategories.length}
            >
              Учить карточки
            </Button>
          )}
        </>
      )}
    </section>
  )
}
