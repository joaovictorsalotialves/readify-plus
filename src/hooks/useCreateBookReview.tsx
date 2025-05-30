import { useContext } from 'react'

import { CreateBookReviewContext } from '@/contexts/CreateBookReviewContext'

export function useCreateBookReview() {
  const context = useContext(CreateBookReviewContext)

  return context
}
