import type { FigmaChapter, FigmaSection } from '@/services/types'
import { api } from '@/shared/lib'

interface FigmaChapterRequest {
  title: string
  order: number
}

interface FigmaSectionRequest {
  chapterId: string
  title: string
  content: string
  order: number
}

interface FigmaMediaResponse {
  url: string
}

const FIGMA_CHAPTERS_URL = '/figma/chapters'
const FIGMA_SECTIONS_URL = '/figma/sections'
const FIGMA_MEDIA_URL = '/figma/media'

const figmaApi = {
  async getChapters(): Promise<FigmaChapter[]> {
    const { data } = await api.get<FigmaChapter[]>(FIGMA_CHAPTERS_URL)
    return data
  },

  async getChapter(id: string): Promise<FigmaChapter> {
    const { data } = await api.get<FigmaChapter>(`${FIGMA_CHAPTERS_URL}/${id}`)
    return data
  },

  async createChapter(payload: FigmaChapterRequest): Promise<FigmaChapter> {
    const { data } = await api.post<FigmaChapter>(FIGMA_CHAPTERS_URL, payload)
    return data
  },

  async updateChapter(
    id: string,
    payload: FigmaChapterRequest,
  ): Promise<FigmaChapter> {
    const { data } = await api.patch<FigmaChapter>(
      `${FIGMA_CHAPTERS_URL}/${id}`,
      payload,
    )
    return data
  },

  async deleteChapter(id: string): Promise<void> {
    await api.delete(`${FIGMA_CHAPTERS_URL}/${id}`)
  },

  async createSection(payload: FigmaSectionRequest): Promise<FigmaSection> {
    const { data } = await api.post<FigmaSection>(FIGMA_SECTIONS_URL, payload)
    return data
  },

  async updateSection(
    id: string,
    payload: FigmaSectionRequest,
  ): Promise<FigmaSection> {
    const { data } = await api.patch<FigmaSection>(
      `${FIGMA_SECTIONS_URL}/${id}`,
      payload,
    )
    return data
  },

  async deleteSection(id: string): Promise<void> {
    await api.delete(`${FIGMA_SECTIONS_URL}/${id}`)
  },

  async uploadMedia(file: File): Promise<FigmaMediaResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const { data } = await api.post<FigmaMediaResponse>(
      FIGMA_MEDIA_URL,
      formData,
    )
    return data
  },
}

export {
  figmaApi,
  type FigmaChapterRequest,
  type FigmaMediaResponse,
  type FigmaSectionRequest,
}
