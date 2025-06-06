<script setup lang="ts">
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
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      ←
    </ButtonComponent>
    <TypographyComponent>Страница {{ currentPage }} из {{ lastPage }}</TypographyComponent>
    <ButtonComponent
      variant="secondary"
      :disabled="currentPage === lastPage"
      @click="goToPage(currentPage + 1)"
    >
      →
    </ButtonComponent>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $gap-small;
}
</style>
