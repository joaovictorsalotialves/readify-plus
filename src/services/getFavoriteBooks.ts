import { api } from '@/lib/axios'

export async function getFavoriteBooks() {
  const response = await api.get('/books/favorites')
  return response.data
}
