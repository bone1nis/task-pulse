<script setup lang="ts">
import { RouterView } from 'vue-router'
import DefaultLayout from '@/core/views/DefaultLayout.vue'
import { useThemeStore } from '@/modules/theme/stores/theme.ts'
import { useAuthStore } from '@/modules/auth/stores/auth.ts'
import { onMounted } from 'vue'
import SpinnerComponent from '@/core/components/ui/SpinnerComponent.vue'

const themeStore = useThemeStore()
const authStore = useAuthStore()

onMounted(() => {
  themeStore.applyTheme()
  authStore.fetchUser()
})
</script>

<template>
  <Suspense>
    <template #default>
      <DefaultLayout>
        <template v-if="!authStore.isLoading">
          <RouterView />
        </template>
        <template v-else>
          <SpinnerComponent />
        </template>
      </DefaultLayout>
    </template>

    <template #fallback>
      <SpinnerComponent />
    </template>
  </Suspense>
</template>
