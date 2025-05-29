import { type ReactNode, createContext, useEffect, useState } from 'react'

import { storageAuthTokenGet } from '@/storage/storageAuthToken'

import type { ReadingDTO } from '@/dtos/reading-dto'
import { getOrCreateReadingService } from '@/services/getOrCreateReadingService'
import { saveProgressReadingService } from '@/services/saveProgressReadingService'
import { Alert } from 'react-native'
import { set } from 'zod'

export type ReadingContextDataProps = {
  reading: ReadingDTO
  isLoadingReading: boolean
  getOrCreateReading: (bookId: string) => Promise<void>
  saveProgressReading: (
    readingId: string,
    duration: number,
    lastPageRead: number
  ) => Promise<void>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
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
  const [page, setPage] = useState<number>(1)
  const [reading, setReading] = useState<ReadingDTO>({} as ReadingDTO)
  const [isLoadingReading, setIsLoadingReading] = useState(true)

  async function getOrCreateReading(bookId: string) {
    try {
      setIsLoadingReading(true)
      setReading({} as ReadingDTO)

      const { token } = await storageAuthTokenGet()

      if (token) {
        const { reading } = await getOrCreateReadingService({ bookId, token })
        setReading(reading)
      }
    } finally {
      setIsLoadingReading(false)
    }
  }

  async function saveProgressReading(
    readingId: string,
    duration: number,
    lastPageRead: number
  ) {
    try {
      const { token } = await storageAuthTokenGet()

      if (token) {
        const { reading } = await saveProgressReadingService({
          readingId,
          duration,
          lastPageRead,
          token,
        })
        setReading(reading)
      }
    } catch (err) {
      Alert.alert('Falha ao salvar o progresso da leitura!')
      console.log(err)
    }
  }

  useEffect(() => {
    setPage(reading.lastPageRead)
  }, [reading])

  return (
    <ReadingContext.Provider
      value={{
        reading,
        isLoadingReading,
        getOrCreateReading,
        saveProgressReading,
        page,
        setPage,
      }}
    >
      {children}
    </ReadingContext.Provider>
  )
}
