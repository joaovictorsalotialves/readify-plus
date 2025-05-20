import type { BooksDTO } from '@/dtos/book-dto'
import { api } from '@/lib/axios'

type GetBookRequest = {
  bookId: string
  token: string
}

type GetBookResponse = {
  book: BooksDTO
}

export async function getBookService({
  bookId,
  token,
}: GetBookRequest): Promise<GetBookResponse> {
  const { data } = await api.get(`/books/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    book: data.book,
  }
}
