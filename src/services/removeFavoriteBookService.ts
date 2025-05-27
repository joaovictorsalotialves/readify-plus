import { api } from '@/lib/axios'

type removeBookFavoriteRequest = {
  bookId: string
  token: string
}

export async function removeBookFavoriteService({
  bookId,
  token,
}: removeBookFavoriteRequest): Promise<void> {
  await api.post(
    '/remove-favorite-book',
    {
      bookId,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
}
