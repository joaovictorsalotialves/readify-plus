import { api } from '@/lib/axios'

import type { BooksDTO } from '@/dtos/book-dto'

type searchBooksRequest = {
  title: string
  token: string
}

type searchBooksResponse = {
  books: BooksDTO[]
}

export async function searchBooksService({
  title,
  token,
}: searchBooksRequest): Promise<searchBooksResponse> {
  const { data } = await api.get(`/books/search?title=${title}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { books: data.books }
}
