import type { Task } from '@/modules/tasks/types/task'

export function normalizeTask(task): Task {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    isCompleted: task.is_completed === 1,
    createdAt: new Date(task.created_at),
    updatedAt: new Date(task.updated_at),
    dueDate: new Date(task.due_date),
    category: task.category,
    tags: task.tags,
  }
}
