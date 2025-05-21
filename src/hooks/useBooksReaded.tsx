import { GetBooksReadedContext } from '@/contexts/GetBooksReadedContext'
import { useContext } from 'react'

export function useBooksReaded() {
  const context = useContext(GetBooksReadedContext)

  return context
}
