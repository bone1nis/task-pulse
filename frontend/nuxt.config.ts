import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt',],
  srcDir: "src/",

  app: {
    head: {
      title: 'Task Pulse — Управление задачами',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        {
          name: 'description',
          content:
            'Task Pulse — идеальное приложение для управления задачами, с возможностью авторизации и роли пользователей. Легко создавайте, редактируйте и отслеживайте свои задачи.',
        },
        {
          name: 'keywords',
          content:
            'задачи, заметки, авторизация, панель администратора, управление задачами, организация задач',
        },
        {
          property: 'og:title',
          content: 'Task Pulse — Управляйте своими задачами с легкостью',
        },
        {
          property: 'og:description',
          content:
            'Лучшее приложение для заметок и управления задачами с авторизацией и возможностью использования панелей администратора и ролей пользователей.',
        },
        {
          name: 'twitter:title',
          content: 'Task Pulse — Управляйте своими задачами с легкостью',
        },
        {
          name: 'twitter:description',
          content:
            'Task Pulse — приложение для эффективного управления задачами с авторизацией и панелью администратора.',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:8080/api',
    },
  },

  css: [
    '~/core/assets/styles/main.scss',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use '@/core/assets/styles/variables.scss' as *;
          @use '@/core/assets/styles/theme.scss' as *;
        `,
        },
      },
    },
  },

  components: [
    {
      path: '~/core/components',
      prefix: '',
      pathPrefix: false,
    },
    {
      path: '~/modules/auth/components',
      prefix: '',
      pathPrefix: false,
    },
    {
      path: '~/modules/profile/components',
      prefix: '',
      pathPrefix: false,
    },
    {
      path: '~/modules/tasks/components',
      prefix: '',
      pathPrefix: false,
    },
  ],

  plugins: [
    '~/core/plugins/fontawesome',
    '~/core/plugins/axios',
    '~/core/plugins/theme.client.ts'
  ],

  imports: {
    dirs: [
      'core/composables',
      'modules/auth/composables',
      'modules/tasks/composables',
    ],
  },
})