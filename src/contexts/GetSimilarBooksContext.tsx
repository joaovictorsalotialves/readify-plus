import { type ReactNode, createContext, useState } from 'react'

import { storageAuthTokenGet } from '@/storage/storageAuthToken'

import type { BooksDTO } from '@/dtos/book-dto'
import { getSimilarBooksService } from '@/services/getSimilarBooksService'

export type GetSimilarBooksContextDataProps = {
  similarBooks: BooksDTO[]
  isLoadingSimilarBooks: boolean
  getSimilarBooks: (bookId: string) => Promise<void>
}

type GetSimilarBooksContextProviderProps = {
  children: ReactNode
}

export const GetSimilarBooksContext =
  createContext<GetSimilarBooksContextDataProps>(
    {} as GetSimilarBooksContextDataProps
  )

export function GetSimilarBooksContextProvider({
  children,
}: GetSimilarBooksContextProviderProps) {
  const [similarBooks, setSimilarBooks] = useState<BooksDTO[]>([])
  const [isLoadingSimilarBooks, setIsLoadingSimilarBooks] = useState(true)

  async function getSimilarBooks(bookId: string) {
    try {
      setIsLoadingSimilarBooks(true)

      const { token } = await storageAuthTokenGet()

      if (token) {
        const { books } = await getSimilarBooksService({ bookId, token })
        setSimilarBooks(books)
      }
    } finally {
      setIsLoadingSimilarBooks(false)
    }
  }

  return (
    <GetSimilarBooksContext.Provider
      value={{
        similarBooks,
        isLoadingSimilarBooks,
        getSimilarBooks,
      }}
    >
      {children}
    </GetSimilarBooksContext.Provider>
  )
}
