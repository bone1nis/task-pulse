<script setup lang="ts">
import type { User } from '@/core/types/user.ts'
import CardComponent from '@/core/components/ui/CardComponent.vue'
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue'

defineProps<{
  user: User
}>()
</script>

<template>
  <CardComponent title="Профиль">
    <template #header>
      <TypographyComponent variant="subheading">
        {{ user.id }} - {{ user.username }}
      </TypographyComponent>
      <TypographyComponent variant="subheading">Роль: {{ user.role === 'admin' ? 'Администратор' : 'Пользователь' }}</TypographyComponent>
    </template>
    <template #content>
      <TypographyComponent>
        Почта:
        <TypographyComponent as="span" color="blue">{{ user.email }}</TypographyComponent>
      </TypographyComponent>
      <TypographyComponent variant="paragraph">Имя: {{ user.firstname || 'Неизвестно'}}</TypographyComponent>
      <TypographyComponent variant="paragraph">Фамилия: {{ user.lastname || 'Неизвестно' }}</TypographyComponent>
      <TypographyComponent variant="paragraph">Отчество: {{ user.middlename || 'Неизвестно' }}</TypographyComponent>
    </template>
  </CardComponent>
</template>
