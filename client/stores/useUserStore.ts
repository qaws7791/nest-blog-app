import { User } from '@/types/common.types'
import { create } from 'zustand'

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  clearUser: () => set({ user: null }),
  setUser: (user) => set({ user }),
}))

export default useUserStore
