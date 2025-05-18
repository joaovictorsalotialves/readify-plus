import { api } from '@/lib/axios'

import type { BooksDTO } from '@/dtos/book-dto'

type getBooksIsReadingRequest = {
  token: string
}

type getBooksIsReadingResponse = {
  books: BooksDTO[]
}

export async function getBooksIsReadingService({
  token,
}: getBooksIsReadingRequest): Promise<getBooksIsReadingResponse> {
  const { data } = await api.get('/is-reading-books', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { books: data.books }
}
