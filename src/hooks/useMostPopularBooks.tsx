import { GetMostPopularBooksContext } from '@/contexts/GetMostPopularBooksContext'
import { useContext } from 'react'

export function useMostPopularBooks() {
  const context = useContext(GetMostPopularBooksContext)

  return context
}
