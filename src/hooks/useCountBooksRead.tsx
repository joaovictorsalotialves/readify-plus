import { CountBooksReadContext } from '@/contexts/CountBooksReadContext'
import { useContext } from 'react'

export function useCountBooksRead() {
  const context = useContext(CountBooksReadContext)

  return context
}
