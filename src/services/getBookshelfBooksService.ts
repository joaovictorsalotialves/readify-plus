import { api } from '@/lib/axios'

type BookshelfBooksRequest = {
  token: string
}

type Book = {
  id: string
  title: string
  author: string
  coverImageUrl: string
  // adicione outras propriedades conforme o retorno da API
}

type BookshelfBooksResponse = {
  reading: Book[]
  readed: Book[]
}

export async function getBookshelfBooksService({
  token,
}: BookshelfBooksRequest): Promise<BookshelfBooksResponse> {
  const { data } = await api.get('/bookshelf', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return {
    reading: data.reading,
    readed: data.readed,
  }
}
