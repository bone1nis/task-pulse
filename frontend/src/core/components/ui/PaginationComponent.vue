<script setup lang="ts">
import ButtonComponent from '@/core/components/ui/ButtonComponent.vue'
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue'

const props = defineProps<{
  currentPage: number
  lastPage: number
}>()

const { lastPage, currentPage } = props

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

const goToPage = (page: number) => {
  if (page >= 1 && page <= lastPage) {
    emit('change', page)
  }
}
</script>

<template>
  <div class="pagination">
    <ButtonComponent
      variant="secondary"
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      ←
    </ButtonComponent>
    <TypographyComponent>Страница {{ currentPage }} из {{ lastPage }}</TypographyComponent>
    <ButtonComponent
      variant="secondary"
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === lastPage"
    >
      →
    </ButtonComponent>
  </div>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $gap-small;
}
</style>
