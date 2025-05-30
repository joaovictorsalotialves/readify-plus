import type { AssessmentDTO } from '@/dtos/assessement-dto'

export const mockReview: AssessmentDTO = {
  id: 'review-1',
  userId: 'user-123',
  bookId: 'book-123',
  user: {
    username: 'João',
  },
  likes: 0,
  score: 4,
  comment: 'Gostei bastante da narrativa.',
  createdAt: new Date('2024-05-10'),
}
