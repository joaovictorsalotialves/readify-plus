import { type ReactNode, createContext, useState } from 'react'

import { storageAuthTokenGet } from '@/storage/storageAuthToken'

import type { BooksDTO } from '@/dtos/book-dto'
import { searchBooksService } from '@/services/searchBookService'

export type SearchBooksContextDataProps = {
  books: BooksDTO[]
  isLoadingBooks: boolean
  searchBooks: (
    title: string,
    categoryId: string,
    writerId: string
  ) => Promise<void>
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

  async function searchBooks(
    title: string,
    categoryId: string,
    writerId: string
  ) {
    const { token } = await storageAuthTokenGet()

    if (token) {
      const { books } = await searchBooksService({
        token,
        title,
        categoryId,
        writerId,
      })
      setBooks(books)
    }

    setIsLoadingBooks(false)
  }

  return (
    <SearchBooksContext.Provider value={{ books, isLoadingBooks, searchBooks }}>
      {children}
    </SearchBooksContext.Provider>
  )
}
