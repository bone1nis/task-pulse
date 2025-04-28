import {createRouter, createWebHistory} from 'vue-router'

import TodoPage from '@/features/todos/pages/TodoPage.vue'
import AuthPage from '@/features/auth/pages/AuthPage.vue'
import RegisterPage from "@/features/auth/pages/RegisterPage.vue";
import LoginPage from "@/features/auth/pages/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: TodoPage,
    },
    {
      path: '/auth',
      component: AuthPage,
      children: [
        {
          path: 'login',
          component: LoginPage,
        },
        {
          path: 'register',
          component: RegisterPage,
        },
        {
          path: '',
          redirect: '/auth/login',
        },
      ],
    },
  ],
})

export default router
