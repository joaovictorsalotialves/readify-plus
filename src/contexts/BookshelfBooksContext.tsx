import { type ReactNode, createContext, useState } from 'react'

import { getBookshelfBooksService } from '@/services/getBookshelfBooksService'
import { storageAuthTokenGet } from '@/storage/storageAuthToken'

type Book = {
  id: string
  title: string
  author: string
  coverImageUrl: string
  // adicione outras propriedades conforme necessário
}

export type BookshelfBooksContextDataProps = {
  booksReading: Book[]
  booksReaded: Book[]
  isLoadingBookshelf: boolean
  getBookshelfBooks: () => Promise<void>
}

type BookshelfBooksContextProviderProps = {
  children: ReactNode
}

export const BookshelfBooksContext = createContext<BookshelfBooksContextDataProps>(
  {} as BookshelfBooksContextDataProps
)

export function BookshelfBooksContextProvider({
  children,
}: BookshelfBooksContextProviderProps) {
  const [booksReading, setBooksReading] = useState<Book[]>([])
  const [booksReaded, setBooksReaded] = useState<Book[]>([])
  const [isLoadingBookshelf, setIsLoadingBookshelf] = useState(true)

  async function getBookshelfBooks() {
    const { token } = await storageAuthTokenGet()

    if (token) {
      const { reading, readed } = await getBookshelfBooksService({ token })
      setBooksReading(reading)
      setBooksReaded(readed)
    }

    setIsLoadingBookshelf(false)
  }

  return (
    <BookshelfBooksContext.Provider
      value={{
        booksReading,
        booksReaded,
        isLoadingBookshelf,
        getBookshelfBooks,
      }}
    >
      {children}
    </BookshelfBooksContext.Provider>
  )
}
