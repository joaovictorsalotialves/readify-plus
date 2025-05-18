import { api } from '@/lib/axios'

type countBooksReadRequest = {
  token: string
}

type countBooksReadResponse = {
  count: number
}

export async function countBooksReadService({
  token,
}: countBooksReadRequest): Promise<countBooksReadResponse> {
  const { data } = await api.get('/read-books/count', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { count: data.count }
}
