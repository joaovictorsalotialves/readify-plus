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

export const mockReviews: AssessmentDTO[] = [
  mockReview,
  {
    id: 'review-2',
    userId: 'user-456',
    bookId: 'book-123',
    user: {
      username: 'João',
    },
    likes: 0,
    score: 4,
    comment: 'Gostei bastante da narrativa.',
    createdAt: new Date('2024-05-10'),
  },
  {
    id: 'review-3',
    userId: 'user-789',
    bookId: 'book-456',
    user: {
      username: 'João',
    },
    likes: 0,
    score: 4,
    comment: 'Livro Ruim.',
    createdAt: new Date('2024-05-10'),
  },
  {
    id: 'review-4',
    userId: 'user-1011',
    bookId: 'book-456',
    user: {
      username: 'João',
    },
    likes: 0,
    score: 4,
    comment: 'Bom livro.',
    createdAt: new Date('2024-05-10'),
  },
]
