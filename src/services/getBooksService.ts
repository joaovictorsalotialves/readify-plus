import { api } from '@/lib/axios'

import type { BooksDTO } from '@/dtos/book-dto'

type getBooksRequest = {
  token: string
}

export type getBooksResponse = {
  books: BooksDTO[]
}

export async function getBooksService({
  token,
}: getBooksRequest): Promise<getBooksResponse> {
  const { data } = await api.get('/books', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { books: data.books }
}
