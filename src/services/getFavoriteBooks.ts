import { api } from '@/lib/axios'

import type { BooksDTO } from '@/dtos/book-dto'

type getFavoriteBooksRequest = {
  token: string
}

export type getFavoriteBooksResponse = {
  books: BooksDTO[]
}

export async function getFavoriteBooksService({
  token,
}: getFavoriteBooksRequest): Promise<getFavoriteBooksResponse> {
  const { data } = await api.get('/favorite-books', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { books: data.books }
}
