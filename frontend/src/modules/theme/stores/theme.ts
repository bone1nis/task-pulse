import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'dark',
  }),
  actions: {
    setTheme(theme: string) {
      this.theme = theme
      if (import.meta.client) {
        document.documentElement.classList.toggle('dark', theme === 'dark')
      }
    },
    toggleTheme() {
      const newTheme = this.theme === 'dark' ? 'light' : 'dark'
      this.setTheme(newTheme)
      if (import.meta.client) {
        localStorage.setItem('theme', newTheme)
      }
    },
  },
})