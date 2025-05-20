import { api } from '@/lib/axios'

import type { BooksDTO } from '@/dtos/book-dto'

type searchBooksRequest = {
  title: string
  categoryId: string
  writerId: string
  token: string
}

type searchBooksResponse = {
  books: BooksDTO[]
}

export async function searchBooksService({
  title,
  categoryId,
  writerId,
  token,
}: searchBooksRequest): Promise<searchBooksResponse> {
  const { data } = await api.get(
    `/books?title=${title}&categoryId=${categoryId}&writerId=${writerId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  return { books: data.books }
}
