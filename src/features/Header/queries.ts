import { api } from '@/shared/lib'

export interface User {
  id: string
  email: string
  role: 'USER' | 'ADMIN'
}

interface AuthMeResponse {
  user: User
}

export const fetchCurrentUser = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<AuthMeResponse>('/auth/me')
    return data.user
  } catch {
    return null
  }
}
