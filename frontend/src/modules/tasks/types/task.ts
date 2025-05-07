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

export type TaskUpdate = Omit<Task, 'id', 'createdAt', 'updatedAt'>

export type TaskCreate = Omit<Task, 'id', 'createdAt', 'updatedAt', 'isCompleted'>

export type TaskFilters = {
  title?: string
  description?: string | null
  isCompleted?: number
  dueDateFrom?: string
  dueDateTo?: string
  categoryId?: number
  tags?: string
  sort?: 'title' | 'description'
  sortDirection?: 'asc' | 'desc'
}

export interface TaskQueryParams {
  title?: string
  description?: string | null
  is_completed?: number
  due_date_from?: string
  due_date_to?: string
  category_id?: number
  tags?: string
}
