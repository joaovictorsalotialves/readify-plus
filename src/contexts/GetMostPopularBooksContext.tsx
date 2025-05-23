import { type ReactNode, createContext, useState } from 'react'

import { storageAuthTokenGet } from '@/storage/storageAuthToken'

import type { BooksDTO } from '@/dtos/book-dto'
import { getMostPopularBooksService } from '@/services/getMostPopularBooksService'

export type GetMostPopularBooksContextDataProps = {
  mostPopularBooks: BooksDTO[]
  isLoadingMostPopularBooks: boolean
  getMostPopularBooks: () => Promise<void>
}

type GetMostPopularBooksContextProviderProps = {
  children: ReactNode
}

export const GetMostPopularBooksContext =
  createContext<GetMostPopularBooksContextDataProps>(
    {} as GetMostPopularBooksContextDataProps
  )

export function GetMostPopularBooksContextProvider({
  children,
}: GetMostPopularBooksContextProviderProps) {
  const [mostPopularBooks, setMostPopularBooks] = useState<BooksDTO[]>([])
  const [isLoadingMostPopularBooks, setIsLoadingMostPopularBooks] =
    useState(true)

  async function getMostPopularBooks() {
    const { token } = await storageAuthTokenGet()

    setIsLoadingMostPopularBooks(true)
    if (token) {
      const { books } = await getMostPopularBooksService({ token })
      setMostPopularBooks(books)
    }

    setIsLoadingMostPopularBooks(false)
  }

  return (
    <GetMostPopularBooksContext.Provider
      value={{
        mostPopularBooks,
        isLoadingMostPopularBooks,
        getMostPopularBooks,
      }}
    >
      {children}
    </GetMostPopularBooksContext.Provider>
  )
}
