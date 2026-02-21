import { Part } from '@/services'
import { api } from '@/shared/lib'

interface PartRequest {
  title: string
  order: number
}

export const partApi = {
  async getAll(): Promise<Part[]> {
    const { data } = await api.get<Part[]>('/part')
    return data
  },

  async create(payload: PartRequest): Promise<Part> {
    const { data } = await api.post<Part>('/part', payload)
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/part/${id}`)
  },
}
