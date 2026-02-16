import { queryKeys } from '@/shared/lib'
import { useQuery } from '@tanstack/react-query'
import { fetchAllParts } from '../queries'
import { Part } from '../types'

interface UsePartsResult {
  parts: Part[]
  isLoading: boolean
  isEmpty: boolean
}

export function useParts(): UsePartsResult {
  const {
    data: parts,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: queryKeys.part,
    queryFn: fetchAllParts,
  })

  const isPending = isLoading || (isFetching && !parts)
  const safeParts = parts ?? []

  return {
    parts: safeParts,
    isLoading: isPending,
    isEmpty: !isPending && safeParts.length === 0,
  }
}
