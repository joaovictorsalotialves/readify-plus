import type { AssessmentDTO } from '@/dtos/assessement-dto'
import { api } from '@/lib/axios'

type CreateBookReviewServiceRequest = {
  score: number
  comment: string
  bookId: string
  token: string
}

export type CreateBookReviewServiceResponse = {
  assessement: AssessmentDTO
}

export async function createBookReviewService({
  score,
  comment,
  bookId,
  token,
}: CreateBookReviewServiceRequest): Promise<CreateBookReviewServiceResponse> {
  const { data } = await api.post(
    '/book-reviews',
    {
      score,
      comment,
      bookId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return {
    assessement: data.assessement,
  }
}
