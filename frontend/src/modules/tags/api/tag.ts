import type { TagsResponse } from '../types/tag'

export const fetchTags = async (page = 1, limit = 10): Promise<TagsResponse> => {
  const data = await useApiFetch<TagsResponse>('/tags', {
    params: { page, per_page: limit }
  })

  if (!data) {
    throw new Error('Пустой ответ от сервера')
  }

  return data
}