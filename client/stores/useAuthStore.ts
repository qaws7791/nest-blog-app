import { create } from 'zustand'

interface AuthStore {
  accessToken: string | null
  setAccessToken: (accessToken: string | null) => void
  clearAccessToken: () => void
}

const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  clearAccessToken: () => set({ accessToken: null }),
  setAccessToken: (accessToken) => set({ accessToken }),
}))

export default useAuthStore
