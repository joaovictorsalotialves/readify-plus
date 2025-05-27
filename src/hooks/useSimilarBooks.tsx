import { GetSimilarBooksContext } from '@/contexts/GetSimilarBooksContext'
import { useContext } from 'react'

export function useSimilarBooks() {
  const context = useContext(GetSimilarBooksContext)

  return context
}
