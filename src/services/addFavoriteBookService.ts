import { api } from '@/lib/axios'

type addBookFavoriteRequest = {
  bookId: string
  token: string
}

export async function addBookFavoriteService({
  bookId,
  token,
}: addBookFavoriteRequest): Promise<void> {
  await api.post(
    '/add-favorite-book',
    {
      bookId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
}
