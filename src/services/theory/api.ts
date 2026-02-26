import type { ChapterWithSubchapters, Part, Subchapter } from '@/services'
import { api } from '@/shared/lib'

interface PartRequest {
  title: string
  order: number
}

interface ChapterRequest {
  partId: string
  title: string
  order: number
}

interface SubchapterRequest {
  chapterId: string
  title: string
  description: string
  order: number
}

const PART_URL = '/part'
const CHAPTER_URL = '/chapter'
const SUBCHAPTER_URL = '/subchapter'

const partApi = {
  async getAll(): Promise<Part[]> {
    const { data } = await api.get<Part[]>(PART_URL)
    return data
  },

  async create(payload: PartRequest): Promise<Part> {
    const { data } = await api.post<Part>(PART_URL, payload)
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${PART_URL}/${id}`)
  },
}

const chapterApi = {
  async getAll(): Promise<ChapterWithSubchapters[]> {
    const { data } = await api.get<ChapterWithSubchapters[]>(CHAPTER_URL)
    return data
  },

  async create(payload: ChapterRequest): Promise<ChapterWithSubchapters> {
    const { data } = await api.post<ChapterWithSubchapters>(
      CHAPTER_URL,
      payload,
    )
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${CHAPTER_URL}/${id}`)
  },
}

const subchapterApi = {
  async getAll(): Promise<Subchapter[]> {
    const { data } = await api.get<Subchapter[]>(SUBCHAPTER_URL)
    return data
  },

  async create(payload: SubchapterRequest): Promise<Subchapter> {
    const { data } = await api.post<Subchapter>(SUBCHAPTER_URL, payload)
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`${SUBCHAPTER_URL}/${id}`)
  },
}

export { chapterApi, partApi, subchapterApi }
