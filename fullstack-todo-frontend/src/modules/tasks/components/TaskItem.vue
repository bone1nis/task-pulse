<script setup lang="ts">
import CardComponent from '@/core/components/ui/CardComponent.vue'
import type { Task } from '@/modules/tasks/types/task.ts'
import TypographyComponent from '@/core/components/ui/TypographyComponent.vue'
import { useDateFormatter } from '@/core/composables/useDateFormatter.ts'
import { useTaskActions } from '@/modules/tasks/composables/useTaskActions.ts'

const props = defineProps<{
  task: Task
  isSingleView?: boolean
}>()

const { task, isSingleView } = props

const { formatDate } = useDateFormatter()

const actions = useTaskActions(task.id, isSingleView ?? false)
</script>

<template>
  <CardComponent
    :title="isSingleView ? `${task.id} - ${task.title}` : task.title"
    :content="task.description"
    :actions="actions"
  >
    <template #header>
      <TypographyComponent variant="paragraph">
        Категория: {{ task.category.name }}
      </TypographyComponent>
      <div v-if="task.tags?.length" class="task__tags">
        <TypographyComponent v-for="tag in task.tags" :key="tag.id" color="blue">
          #{{ tag.name }}
        </TypographyComponent>
      </div>
    </template>
    <template #content>
      <div class="task__content">
        <TypographyComponent>
          Статус:
          <TypographyComponent as="span" :color="task.isCompleted ? 'green' : 'yellow'">
            {{ task.isCompleted ? 'Завершено' : 'В процессе' }}
          </TypographyComponent>
        </TypographyComponent>
        <div v-if="task.dueDate" class="task__dates">
          <TypographyComponent>
            Дата создания: {{ formatDate(task.createdAt) }}
          </TypographyComponent>
          <TypographyComponent v-if="isSingleView">
            Дата обновления: {{ formatDate(task.updatedAt) }}
          </TypographyComponent>
          <TypographyComponent>
            Дата выполнения: {{ formatDate(task.dueDate) }}
          </TypographyComponent>
        </div>
      </div>
    </template>
  </CardComponent>
</template>

<style scoped lang="scss">
@import '@/core/assets/styles/theme.scss';

.task__content {
  margin-top: $spacing-sm;
}

.task__tags {
  display: flex;
  gap: $gap-small;
}

.task__category {
  margin-top: $spacing-sm;
}

.task__status {
  margin-top: $spacing-sm;
}

.task__dates {
  margin-top: $spacing-sm;
}
</style>
