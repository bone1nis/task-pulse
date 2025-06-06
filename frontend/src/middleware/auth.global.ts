import { useAuthStore } from "~/modules/auth/stores/auth"

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }
})