<script setup lang="ts">
import CardComponent from '@/core/components/ui/CardComponent.vue'
import type { Task } from '@/core/types/task.ts'
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue'

const actions = [
  {
    label: 'Удалить',
    handler: () => console.log('Удалить задачу'),
  },
]

const task: Task = {
  id: 1,
  title: 'Тудушка',
  content: 'Задача, которую нужно выполнить',
  category: {
    name: 'Работа',
    id: 1,
  },
  dueDate: '2025-05-10',
  createdAt: '2025-04-10',
  updatedAt: '2025-04-15',
  isCompleted: false,
  tags: [
    {
      name: 'да',
      id: 1,
    },
    {
      name: 'нет',
      id: 2,
    },
  ],
}
</script>

<template>
  <CardComponent :title="task.title" :content="task.content" :actions="actions">
    <div v-if="task.category" class="task-category">
      <TypographyComponent variant="paragraph">Категория: {{ task.category.name }}</TypographyComponent>
    </div>
    <div v-if="task.tags && task.tags.length" class="task-tags">
      <TypographyComponent v-for="tag in task.tags" :key="tag.id" color="blue">
        {{ tag.name }}
      </TypographyComponent>
    </div>
    <div class="task-status">
      <TypographyComponent>
        Статус:
        <TypographyComponent :as="span" :color="task.isCompleted ? 'green' : 'yellow'">
          {{ task.isCompleted ? 'Завершено' : 'В процессе' }}
        </TypographyComponent>
      </TypographyComponent>
    </div>
    <div v-if="task.dueDate" class="task-due-date">
      <TypographyComponent> Дата выполнения: {{ task.dueDate }}</TypographyComponent>
      <TypographyComponent> Дата создания: {{ task.createdAt }}</TypographyComponent>
      <TypographyComponent> Дата обновления: {{ task.updatedAt }}</TypographyComponent>
    </div>
  </CardComponent>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.task-category {
  margin-top: 10px;
}

.task-status {
  margin-top: 10px;
}
</style>
