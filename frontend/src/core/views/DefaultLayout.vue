<script setup lang="ts">
import AppBar from '@/core/components/AppBar.vue'
import ContentWrapper from '@/core/components/ContentWrapper.vue'
</script>

<template>
  <AppBar />
  <ContentWrapper as="main" padding="medium">
    <slot />
  </ContentWrapper>
</template>
