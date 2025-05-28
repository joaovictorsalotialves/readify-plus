import { api } from '@/lib/axios'

import type { BookCategoryDTO } from '@/dtos/book-category-dto'

export type getBookCategoriesResponse = {
  bookCategories: BookCategoryDTO[]
}

export async function getBookCategoriesService(): Promise<getBookCategoriesResponse> {
  const { data } = await api.get('/book-categories')

  return { bookCategories: data.bookCategories }
}
