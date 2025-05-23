import { GetRecommendBooksContext } from '@/contexts/GetRecommedBooksContext'
import { useContext } from 'react'

export function useRecommendBooks() {
  const context = useContext(GetRecommendBooksContext)

  return context
}
