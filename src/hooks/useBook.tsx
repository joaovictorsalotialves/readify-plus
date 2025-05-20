import { GetBookContext } from '@/contexts/GetBookContext'
import { useContext } from 'react'

export function useBook() {
  const context = useContext(GetBookContext)

  return context
}
