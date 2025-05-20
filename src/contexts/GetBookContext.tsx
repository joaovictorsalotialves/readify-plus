import { type ReactNode, createContext, useState } from 'react'

import { storageAuthTokenGet } from '@/storage/storageAuthToken'

import type { BooksDTO } from '@/dtos/book-dto'
import { getBookService } from '@/services/getBookService'

export type GetBookContextDataProps = {
  book: BooksDTO
  isLoadingBook: boolean
  getBook: (bookId: string) => Promise<void>
}

type GetBookContextProviderProps = {
  children: ReactNode
}

export const GetBookContext =
  createContext<GetBookContextDataProps>(
    {} as GetBookContextDataProps
  )

export function GetBooksIsReadingContextProvider({
  children,
}: GetBookContextProviderProps) {
  const [book, setBook] = useState<BooksDTO>({} as BooksDTO)
  const [isLoadingBook, setIsLoadingBook] = useState(true)

  async function getBook(bookId: string) {
    const { token } = await storageAuthTokenGet()

    if (token) {
      const { book } = await getBookService({ bookId, token })
      setBook(book)
    }

    setIsLoadingBook(false)
  }

  return (
    <GetBookContext.Provider
      value={{ book, isLoadingBook, getBook }}
    >
      {children}
    </GetBookContext.Provider>
  )
}
