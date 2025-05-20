import { CountBookReviewContext } from '@/contexts/CountBookReviewContext'
import { useContext } from 'react'

export function useCountBookReview() {
  const context = useContext(CountBookReviewContext)

  return context
}
