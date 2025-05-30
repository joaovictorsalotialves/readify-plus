import { api } from '@/lib/axios'

type removeBookReviewRequest = {
  assessementId: string
  userId: string
}

export async function removeBookReviewService({
  assessementId,
  userId,
}: removeBookReviewRequest): Promise<void> {
  console.log(assessementId, userId)

  await api.post('/remove-book-review', {
    assessementId,
    userId,
  })
}
