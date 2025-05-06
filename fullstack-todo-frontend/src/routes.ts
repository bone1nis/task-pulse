import { createRouter, createWebHistory } from 'vue-router'

import AuthPage from '@/modules/auth/views/AuthPage.vue'
import { useAuthStore } from '@/modules/auth/stores/auth.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/modules/home/views/HomePage.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/modules/profile/views/ProfilePage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      component: AuthPage,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/modules/auth/views/LoginPage.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/modules/auth/views/RegisterPage.vue'),
        },
        {
          path: '',
          redirect: '/auth/login',
        },
      ],
    },
    {
      path: '/tasks',
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'tasks',
          component: () => import('@/modules/tasks/views/TasksPage.vue'),
        },
        {
          path: 'create',
          name: 'task-create',
          component: () => import('@/modules/tasks/views/CreateTaskPage.vue'),
        },
        {
          path: ':id',
          name: 'task',
          component: () => import('@/modules/tasks/views/TaskPage.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isLoading) {
    return next()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' })
  }

  next()
})

export default router
