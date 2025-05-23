import { api } from '@/lib/axios'

import type { BooksDTO } from '@/dtos/book-dto'

type getMostPopularBooksRequest = {
  token: string
}

export type getMostPopularBooksResponse = {
  books: BooksDTO[]
}

export async function getMostPopularBooksService({
  token,
}: getMostPopularBooksRequest): Promise<getMostPopularBooksResponse> {
  const { data } = await api.get('/most-popular-books', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { books: data.books }
}
