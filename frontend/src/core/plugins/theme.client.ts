import { useThemeStore } from "~/modules/theme/stores/theme"

export default defineNuxtPlugin(() => {
  const themeStore = useThemeStore()

  const savedTheme = localStorage.getItem('theme') || 'dark'

  themeStore.setTheme(savedTheme)
})