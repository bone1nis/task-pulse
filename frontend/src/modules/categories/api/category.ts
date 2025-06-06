import type { CategoriesResponse } from '../types/category'

export const fetchCategories = async (page = 1, limit = 10): Promise<CategoriesResponse> => {
  return await useApiFetch<CategoriesResponse>('/categories', {
    params: { page, per_page: limit }
  })
}