import { api } from '@/lib/axios'

type countBookReviewRequest = {
  token: string
}

type countBookReviewResponse = {
  count: number
}

export async function countBookReviewService({
  token,
}: countBookReviewRequest): Promise<countBookReviewResponse> {
  const { data } = await api.get('/book-review/count', {
    headers: { Authorization: `Bearer ${token}` },
  })

  return { count: data.count }
}
