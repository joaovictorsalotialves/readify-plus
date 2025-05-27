import { api } from '@/lib/axios'

import type { BooksDTO } from '@/dtos/book-dto'

type getSimilarBooksRequest = {
  bookId: string
  token: string
}

export type getSimilarBooksResponse = {
  books: BooksDTO[]
}

export async function getSimilarBooksService({
  bookId,
  token,
}: getSimilarBooksRequest): Promise<getSimilarBooksResponse> {
  const { data } = await api.get(`/similar-books/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { books: data.books }
}
