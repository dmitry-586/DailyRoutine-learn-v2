import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IAuthStore {
  isLogin: boolean
  isLoading: boolean
  setIsLogin: () => void
  setIsLoading: (value: boolean) => void
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      isLogin: false,
      isLoading: true,
      setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
      setIsLoading: (value) => set({ isLoading: value }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setIsLoading(false)
      },
    },
  ),
)
