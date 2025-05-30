import type { AssessmentDTO } from '@/dtos/assessement-dto'
import { api } from '@/lib/axios'

type GetBookReviewsOfBookServiceRequest = {
  bookId: string
  token: string
}

export type GetBookReviewsOfBookServiceResponse = {
  assessements: AssessmentDTO[]
}

export async function getBookReviewsOfBookService({
  bookId,
  token,
}: GetBookReviewsOfBookServiceRequest): Promise<GetBookReviewsOfBookServiceResponse> {
  const { data } = await api.get(`/book-reviews/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    assessements: data.assessement,
  }
}
