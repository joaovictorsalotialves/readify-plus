import { useContext } from 'react'

import { GetBookReviewsOfBookContext } from '@/contexts/GetBookReviewsOfBookContext'

export function useGetBookReviewsOfBook() {
  const context = useContext(GetBookReviewsOfBookContext)

  return context
}
