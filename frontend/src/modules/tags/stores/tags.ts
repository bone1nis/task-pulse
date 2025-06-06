import { defineStore } from 'pinia'
import type { Tag } from '../types/tag'
import { fetchTags } from '../api/tag'

interface TagsState {
  tags: Tag[]
  total: number | null
  currentPage: number
  lastPage: number
  isLoading: boolean
}

export const useTagsStore = defineStore('tags', {
  state: (): TagsState => ({
    tags: [],
    currentPage: 1,
    lastPage: 1,
    isLoading: false,
    total: null
  }),

  actions: {
    async fetchTags(page = 1, limit = 10) {
      this.isLoading = true

      try {
        const response = await fetchTags(page, limit)
        this.tags = response.data

        this.total = response.meta.total
        this.currentPage = response.meta.current_page
        this.lastPage = response.meta.last_page
      } catch (error) {
        console.error('Ошибка загрузки тегов:', error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
