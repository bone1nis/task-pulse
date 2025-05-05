import { defineStore } from 'pinia'
import type { User } from '@/core/types/user.ts'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
    },
  },

  persist: {
    key: 'auth',
    paths: ['user', 'isAuthenticated'],
  },
})
