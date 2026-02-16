import { api } from '@/shared/lib'
import type { AuthMeResponse, Part, User } from './types'

const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<AuthMeResponse>('/auth/me')
    return data.user
  } catch {
    return null
  }
}

const fetchAllParts = async (): Promise<Part[]> => {
  const { data } = await api.get<Part[]>('/part')

  return Array.isArray(data) ? data : []
}

export { fetchAllParts, fetchCurrentUser }
