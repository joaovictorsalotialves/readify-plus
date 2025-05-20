import { BookshelfBooksContext } from '@/contexts/BookshelfBooksContext'
import { useContext } from 'react'

export function useBookshelfBooks() {
  const context = useContext(BookshelfBooksContext)

  return context
}
