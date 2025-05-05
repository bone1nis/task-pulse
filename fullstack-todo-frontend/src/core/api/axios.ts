import axios from 'axios'
import { useAuthStore } from '@/modules/auth/stores/auth.ts'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
})

let isRefreshing = false
let subscribers: Array<() => void> = []

function onRefreshed() {
  subscribers.forEach(callback => callback())
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

        onRefreshed()
        return api(originalRequest)
      } catch (err) {
        authStore.logout()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
