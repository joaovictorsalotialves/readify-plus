import { SearchBooksContext } from '@/contexts/SearchBooksContext'
import { useContext } from 'react'

export function useSearchBooks() {
  const context = useContext(SearchBooksContext)

  return context
}
