import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IFigmaStore {
  currentChapter: string
  setCurrentChapter: (chapterId: string) => void
}

export const useFigmaStore = create<IFigmaStore>()(
  persist(
    (set) => ({
      currentChapter: '',
      setCurrentChapter: (chapterId) => set({ currentChapter: chapterId }),
    }),
    { name: 'figma-storage' },
  ),
)
