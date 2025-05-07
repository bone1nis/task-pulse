<script setup lang="ts">

</script>

<template>
  <div class="spinner-wrapper">
    <div class="spinner"></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.spinner {
  border: $border-medium solid $color-gray;
  border-top: $border-medium solid $color-green;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
