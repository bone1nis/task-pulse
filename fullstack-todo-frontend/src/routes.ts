import {createRouter, createWebHistory} from 'vue-router'

import AuthPage from '@/modules/auth/views/AuthPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import('@/modules/home/views/HomePage.vue'),
    },
    {
      path: '/auth',
      component: AuthPage,
      children: [
        {
          path: 'login',
          component: () => import('@/modules/auth/views/LoginPage.vue'),
        },
        {
          path: 'register',
          component: () => import('@/modules/auth/views/RegisterPage.vue'),
        },
        {
          path: '',
          redirect: '/auth/login',
        },
      ],
    },
    {
      path: "/tasks",
      name: "tasks",
      component: () => import('@/modules/tasks/views/TaskList.vue'),
    }
  ],
})

export default router
