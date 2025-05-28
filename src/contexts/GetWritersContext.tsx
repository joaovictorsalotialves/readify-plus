import { type ReactNode, createContext, useState } from 'react'

import type { WriterDTO } from '@/dtos/writer-dto'
import { getWritersService } from '@/services/getWritersService'

export type GetWritersContextDataProps = {
  writers: WriterDTO[]
  isLoadingWriters: boolean
  getWriters: () => Promise<void>
}

type GetWritersContextProviderProps = {
  children: ReactNode
}

export const GetWritersContext = createContext<GetWritersContextDataProps>(
  {} as GetWritersContextDataProps
)

export function GetWritersContextProvider({
  children,
}: GetWritersContextProviderProps) {
  const [writers, setWriters] = useState<WriterDTO[]>([])
  const [isLoadingWriters, setIsLoadingWriters] = useState(true)

  async function getWriters() {
    try {
      setIsLoadingWriters(true)
      const { writers } = await getWritersService()
      setWriters(writers)
    } finally {
      setIsLoadingWriters(false)
    }
  }

  return (
    <GetWritersContext.Provider
      value={{
        writers,
        isLoadingWriters,
        getWriters,
      }}
    >
      {children}
    </GetWritersContext.Provider>
  )
}
