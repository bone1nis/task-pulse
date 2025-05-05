import {createRouter, createWebHistory} from 'vue-router'

import AuthPage from '@/modules/auth/views/AuthPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/modules/home/views/HomePage.vue'),
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
      path: "/tasks",
      name: "tasks",
      component: () => import('@/modules/tasks/views/TasksPage.vue'),
    },
    {
      path: '/tasks/:id',
      name: "task",
      component: () => import('@/modules/tasks/views/TaskPage.vue'),
    }
  ],
})

export default router
