import type { Tag } from '@/modules/tags/types/tag.ts'
import type { Category } from '@/modules/categories/types/category.ts'

export interface Task {
  id: number
  title: string
  description: string
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
  dueDate: Date
  category: Category
  tags: Tag[]
}

export type TaskUpdate = Omit<Task, "id", "createdAt", "updatedAt">

export type TaskCreate = Omit<Task, "id", "createdAt", "updatedAt", "isCompleted">
