import { defineStore } from 'pinia'
import type { Category } from '@/modules/categories/types/category.ts'
import { fetchCategories } from '@/modules/categories/api/category.ts'

interface CategoriesState {
  categories: Category[]
  total: number
  currentPage: number
  lastPage: number
  isLoading: boolean
}

export const useCategoriesStore = defineStore('categories', {
  state: (): CategoriesState => ({
    categories: [],
    currentPage: 1,
    lastPage: 1,
    isLoading: false,
  }),

  actions: {
    async fetchCategories(page = 1, limit = 10) {
      this.isLoading = true

      try {
        const response = await fetchCategories(page, limit)
        this.categories = response.data

        this.total = response.meta.total
        this.currentPage = response.meta.current_page
        this.lastPage = response.meta.last_page
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
