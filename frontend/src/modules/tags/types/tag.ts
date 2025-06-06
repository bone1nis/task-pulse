import type { PaginationLinks, PaginationMeta } from "~/core/types/pagination"

export interface Tag {
  id: number
  name: string
}

export interface TagsResponse {
  data: Tag[]
  links: PaginationLinks
  meta: PaginationMeta
}