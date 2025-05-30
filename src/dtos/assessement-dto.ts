export interface AssessmentDTO {
  id: string
  score: number
  comment: string
  likes: number
  createdAt: Date
  bookId: string
  userId: string
  user: {
    username: string
  }
}
