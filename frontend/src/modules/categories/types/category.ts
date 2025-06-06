import type { PaginationLinks, PaginationMeta } from "~/core/types/pagination"

export interface Category {
  id: number
  name: string
}

export interface CategoriesResponse {
  data: Category[]
  links: PaginationLinks
  meta: PaginationMeta
}