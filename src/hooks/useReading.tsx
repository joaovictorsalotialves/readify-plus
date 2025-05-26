import { ReadingContext } from '@/contexts/ReadingContext'
import { useContext } from 'react'

export function useReading() {
  const context = useContext(ReadingContext)

  return context
}
