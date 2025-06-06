import type { ApiTask, TaskCreate, TaskQueryParams, TasksResponse, TaskUpdate } from "../types/task"

export const fetchTasks = async (params: TaskQueryParams = {}): Promise<TasksResponse> => {
  return await useApiFetch<TasksResponse>('/tasks', { params })
}

export const getTaskById = async (taskId: number): Promise<ApiTask> => {
  return await useApiFetch<ApiTask>(`/tasks/${taskId}`)
}

export const deleteTask = async (taskId: number): Promise<void> => {
  await useApiFetch(`/tasks/${taskId}`, {
    method: 'DELETE',
  })
}

export const updateTask = async (taskId: number, updatedData: TaskUpdate): Promise<{ data: ApiTask }> => {
  const payload = {
    title: updatedData.title,
    description: updatedData.description || null,
    is_completed: updatedData.isCompleted,
    due_date: updatedData.dueDate,
    tags: updatedData.tags,
    category_id: updatedData.category,
  }

  return await useApiFetch<{ data: ApiTask }>(`/tasks/${taskId}`, {
    method: 'PUT',
    body: payload,
  })
}

export const createTask = async (createdData: TaskCreate): Promise<{ data: ApiTask }> => {
  const payload = {
    title: createdData.title,
    description: createdData.description,
    due_date: createdData.dueDate,
    tags: createdData.tags,
    category_id: createdData.category,
  }

  return await useApiFetch<{ data: ApiTask }>('/tasks', {
    method: 'POST',
    body: payload,
  })
}