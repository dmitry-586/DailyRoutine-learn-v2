'use client'

import { api } from '@/shared/lib'
import { CategoryItem } from '@/shared/types'
import { useEffect, useState } from 'react'

export function useCategory() {
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    let cancelled = false

    api
      .get<CategoryItem[]>('/category')
      .then(({ data }) => {
        if (!cancelled) {
          setCategories(Array.isArray(data) ? data : [])
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? 'Ошибка загрузки')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { categories, loading, error }
}
