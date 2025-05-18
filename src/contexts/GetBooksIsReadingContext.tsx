import { type ReactNode, createContext, useState } from 'react'

import { getBooksIsReadingService } from '@/services/getBookIsReadingService'
import { storageAuthTokenGet } from '@/storage/storageAuthToken'

import type { BooksDTO } from '@/dtos/book-dto'

export type GetBooksIsReadingContextDataProps = {
  booksIsReading: BooksDTO[]
  isLoadingBooksIsReading: boolean
  getBooksIsReading: () => Promise<void>
}

type GetBooksIsReadingContextProviderProps = {
  children: ReactNode
}

export const GetBooksIsReadingContext =
  createContext<GetBooksIsReadingContextDataProps>(
    {} as GetBooksIsReadingContextDataProps
  )

export function GetBooksIsReadingContextProvider({
  children,
}: GetBooksIsReadingContextProviderProps) {
  const [booksIsReading, setBooksIsReading] = useState<BooksDTO[]>([])
  const [isLoadingBooksIsReading, setIsLoadingBooksIsReading] = useState(true)

  async function getBooksIsReading() {
    const { token } = await storageAuthTokenGet()

    if (token) {
      const { books } = await getBooksIsReadingService({ token })
      setBooksIsReading(books)
    }

    setIsLoadingBooksIsReading(false)
  }

  return (
    <GetBooksIsReadingContext.Provider
      value={{ booksIsReading, isLoadingBooksIsReading, getBooksIsReading }}
    >
      {children}
    </GetBooksIsReadingContext.Provider>
  )
}
