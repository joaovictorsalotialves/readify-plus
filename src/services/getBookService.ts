import { api } from '@/lib/axios'
import type { BooksDTO } from '@/dtos/book-dto'

type GetBookRequest = {
  bookId: string
  token: string
}

type GetBookResponse = {
  book: BooksDTO
}

export async function getBookById({
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
