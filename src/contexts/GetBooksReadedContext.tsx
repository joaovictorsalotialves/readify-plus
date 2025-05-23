import { type ReactNode, createContext, useState } from 'react'

import { getBooksReadedService } from '@/services/getBooksReadedService'
import { storageAuthTokenGet } from '@/storage/storageAuthToken'

import type { BooksDTO } from '@/dtos/book-dto'

export type GetBooksReadedContextDataProps = {
  booksReaded: BooksDTO[]
  isLoadingBooksReaded: boolean
  getBooksReaded: () => Promise<void>
}

type GetBooksReadedContextProviderProps = {
  children: ReactNode
}

export const GetBooksReadedContext =
  createContext<GetBooksReadedContextDataProps>(
    {} as GetBooksReadedContextDataProps
  )

export function GetBooksReadedContextProvider({
  children,
}: GetBooksReadedContextProviderProps) {
  const [booksReaded, setBooksReaded] = useState<BooksDTO[]>([])
  const [isLoadingBooksReaded, setIsLoadingBooksReaded] = useState(true)

  async function getBooksReaded() {
    try {
      setIsLoadingBooksReaded(true)

      const { token } = await storageAuthTokenGet()

      if (token) {
        const { books } = await getBooksReadedService({ token })
        setBooksReaded(books)
      }
    } finally {
      setIsLoadingBooksReaded(false)
    }
  }

  return (
    <GetBooksReadedContext.Provider
      value={{ booksReaded, isLoadingBooksReaded, getBooksReaded }}
    >
      {children}
    </GetBooksReadedContext.Provider>
  )
}
