import axios from 'axios'
import { useAuthStore } from '~/modules/auth/stores/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
    withCredentials: true,
  })

  let isRefreshing = false
  let subscribers: (() => void)[] = []

  function onRefreshed() {
    subscribers.forEach((cb) => cb())
    subscribers = []
  }

  function subscribeTokenRefresh(cb: () => void) {
    subscribers.push(cb)
  }

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        const authStore = useAuthStore()

        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh(() => resolve(api(originalRequest)))
          })
        }

        isRefreshing = true

        try {
          await api.post('/auth/refresh')

          const meRes = await api.post('/auth/me')
          authStore.setUser(meRes.data)
          console.log(meRes.data);

          onRefreshed()
          return api(originalRequest)
        } catch (err) {
          authStore.clearUser()
          return Promise.reject(err)
        } finally {
          isRefreshing = false
        }
      }

      return Promise.reject(error)
    },
  )

  return {
    provide: {
      api,
    },
  }
})