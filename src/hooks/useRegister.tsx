import { RegisterContext } from '@/contexts/RegisterContext'

import { useContext } from 'react'

export function useRegister() {
  const context = useContext(RegisterContext)

  return context
}

