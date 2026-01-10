import { create } from 'zustand'

interface SearchLocationType {
  keyword: string
  setKeyword: (keyword: string) => void
  clearKeyword: () => void
}

export const useSearchLocationStore = create<SearchLocationType>((set) => ({
  keyword: '',
  setKeyword: (keyword) => set({ keyword }),
  clearKeyword: () => set({ keyword: '' }),

}))