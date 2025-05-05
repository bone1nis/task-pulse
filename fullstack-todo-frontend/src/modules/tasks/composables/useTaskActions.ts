import { useRouter } from 'vue-router'
import { useTasksStore } from '@/modules/tasks/stores/tasks.ts'
import type { Action } from '@/core/types/action.ts'

export const useTaskActions = (taskId: number, isSingleView: boolean) => {
  const router = useRouter()
  const taskStore = useTasksStore()

  const commonActions: Action[] = [
    {
      label: 'Редактировать',
      handler: () =>
        router.push({
          name: 'task',
          params: { id: taskId },
          query: { editing: 'true' }
        })
    },
    {
      variant: 'error',
      label: 'Удалить',
      handler: async () => {
        if (isSingleView) {
          await router.push({ name: 'tasks' })
        }
        await taskStore.deleteTask(taskId)
      }
    }
  ]

  const singleViewActions: Action[] = [
    ...commonActions,
    {
      variant: 'secondary',
      label: 'Вернуться к задачам',
      handler: () => router.push({ name: 'tasks' })
    }
  ]

  const moreActions: Action[] = [
    ...commonActions,
    {
      variant: 'secondary',
      label: 'Перейти к задаче',
      handler: () => router.push({ name: 'task', params: { id: taskId } })
    }
  ]

  return isSingleView ? singleViewActions : moreActions
}
