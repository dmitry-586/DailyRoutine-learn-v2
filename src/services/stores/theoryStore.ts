import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ITheoryStore {
  currentChapter: string
  setCurrentChapter: (chapterId: string) => void
}

export const useTheoryStore = create<ITheoryStore>()(
  persist(
    (set) => ({
      currentChapter: '',
      setCurrentChapter: (chapterId) => set({ currentChapter: chapterId }),
    }),
    { name: 'theory-storage' },
  ),
)
