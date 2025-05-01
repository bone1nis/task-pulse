export interface Category {
  id: number
  name: string
}

export interface Tag {
  id: number
  name: string
}

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
