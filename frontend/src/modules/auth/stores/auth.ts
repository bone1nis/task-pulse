import { defineStore } from 'pinia'
import type { User } from '@/core/types/user.ts'
import { register, logout, login, me } from '@/modules/auth/api/auth.ts'
import { useTasksStore } from '@/modules/tasks/stores/tasks.ts'
import { useCategoriesStore } from '@/modules/categories/stores/categories.ts'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  }),

  actions: {
    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    },

    clearUser() {
      this.user = null
      this.isAuthenticated = false
    },

    async fetchUser() {
      this.isLoading = true
      try {
        const user = await me()
        this.setUser(user)
      } catch {
        this.clearUser()
      } finally {
        this.isLoading = false
      }
    },

    async login(values) {
      this.isLoading = true
      try {
        const user = await login(values)
        this.setUser(user)
      } catch (error) {
        this.clearUser()
        console.warn('Ошибка при авторизации', error)
      } finally {
        this.isLoading = false
      }
    },

    async register(values) {
      this.isLoading = true
      try {
        const user = await register(values)
        this.setUser(user)
      } catch (error) {
        this.clearUser()
        console.warn('Ошибка при регистрации', error)
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      this.isLoading = true
      try {
        await logout()
      } catch (error) {
        console.warn('Ошибка при выходе', error)
      } finally {
        this.clearUser()

        const taskStore = useTasksStore()
        const categoryStore = useCategoriesStore()
        const tagStore = useTasksStore()

        taskStore.$reset()
        categoryStore.$reset()
        tagStore.$reset()

        this.isLoading = false
      }
    },
  },

  persist: {
    key: 'auth',
    paths: ['user', 'isAuthenticated'],
  },
})
