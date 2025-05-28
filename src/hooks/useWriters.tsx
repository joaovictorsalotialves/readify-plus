import { GetWritersContext } from '@/contexts/GetWritersContext'
import { useContext } from 'react'

export function useWriters() {
  const context = useContext(GetWritersContext)

  return context
}
