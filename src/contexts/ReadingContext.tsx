import { type ReactNode, createContext, useState } from 'react'

import { storageAuthTokenGet } from '@/storage/storageAuthToken'

import type { ReadingDTO } from '@/dtos/reading-dto'
import { getOrCreateReadingService } from '@/services/getOrCreateReadingService'

export type ReadingContextDataProps = {
  reading: ReadingDTO
  isLoadingReading: boolean
  getOrCreateReading: (bookId: string) => Promise<void>
}

type ReadingContextProviderProps = {
  children: ReactNode
}

export const ReadingContext = createContext<ReadingContextDataProps>(
  {} as ReadingContextDataProps
)

export function ReadingContextProvider({
  children,
}: ReadingContextProviderProps) {
  const [reading, setReading] = useState<ReadingDTO>({} as ReadingDTO)
  const [isLoadingReading, setIsLoadingReading] = useState(true)

  async function getOrCreateReading(bookId: string) {
    try {
      setIsLoadingReading(true)

      const { token } = await storageAuthTokenGet()

      if (token) {
        const { reading } = await getOrCreateReadingService({ bookId, token })
        setReading(reading)
      }
    } finally {
      setIsLoadingReading(false)
    }
  }

  return (
    <ReadingContext.Provider
      value={{ reading, isLoadingReading, getOrCreateReading }}
    >
      {children}
    </ReadingContext.Provider>
  )
}
