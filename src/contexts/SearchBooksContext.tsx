import { type ReactNode, createContext, useState } from 'react'

import { storageAuthTokenGet } from '@/storage/storageAuthToken'

import type { BooksDTO } from '@/dtos/book-dto'
import {
  type getBooksResponse,
  getBooksService,
} from '@/services/getBooksService'
import { searchBooksService } from '@/services/searchBooksService'

export type SearchBooksContextDataProps = {
  books: BooksDTO[]
  isLoadingBooks: boolean
  searchBooks: (title?: string) => Promise<void>
}

type SearchBooksContextProviderProps = {
  children: ReactNode
}

export const SearchBooksContext = createContext<SearchBooksContextDataProps>(
  {} as SearchBooksContextDataProps
)

export function SearchBooksContextProvider({
  children,
}: SearchBooksContextProviderProps) {
  const [books, setBooks] = useState<BooksDTO[]>([])
  const [isLoadingBooks, setIsLoadingBooks] = useState(true)

  async function searchBooks(title?: string) {
    try {
      setIsLoadingBooks(true)

      const { token } = await storageAuthTokenGet()

      if (token) {
        let result: getBooksResponse

        if (!title) {
          result = await getBooksService({ token })
        } else {
          result = await searchBooksService({ token, title })
        }

        setBooks(result.books)
      }
    } catch (error) {
      setBooks([])
    } finally {
      setIsLoadingBooks(false)
    }
  }

  return (
    <SearchBooksContext.Provider value={{ books, isLoadingBooks, searchBooks }}>
      {children}
    </SearchBooksContext.Provider>
  )
}
