<script setup lang="ts">
import { RouterView } from 'vue-router'
import DefaultLayout from '@/core/views/DefaultLayout.vue'
import { useThemeStore } from '@/modules/theme/stores/theme.ts'
import { onMounted } from 'vue'
import SpinnerComponent from '@/core/components/ui/SpinnerComponent.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.applyTheme()
})
</script>

<template>
  <Suspense>
    <template #default>
      <DefaultLayout>
        <RouterView />
      </DefaultLayout>
    </template>
    <template #fallback>
      <SpinnerComponent />
    </template>
  </Suspense>
</template>
