import { api } from '@/lib/axios'

import type { BooksDTO } from '@/dtos/book-dto'

type GetBooksReadedRequest = {
  token: string
}

type GetBooksReadedResponse = {
  books: BooksDTO[]
}

export async function getBooksReadedService({
  token,
}: GetBooksReadedRequest): Promise<GetBooksReadedResponse> {
  const { data } = await api.get('/read-books', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    books: data.books,
  }
}
