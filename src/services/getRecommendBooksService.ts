import { api } from '@/lib/axios'

import type { BooksDTO } from '@/dtos/book-dto'

type getRecommendBooksRequest = {
  token: string
}

export type getRecommendBooksResponse = {
  books: BooksDTO[]
}

export async function getRecommendBooksService({
  token,
}: getRecommendBooksRequest): Promise<getRecommendBooksResponse> {
  const { data } = await api.get('/recommend-books', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { books: data.books }
}
