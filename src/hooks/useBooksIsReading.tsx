import { GetBooksIsReadingContext } from '@/contexts/GetBooksIsReadingContext'
import { useContext } from 'react'

export function useBooksIsReading() {
  const context = useContext(GetBooksIsReadingContext)

  return context
}
