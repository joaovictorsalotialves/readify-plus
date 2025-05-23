import { type ReactNode, createContext, useState } from 'react'

import { storageAuthTokenGet } from '@/storage/storageAuthToken'

import type { BooksDTO } from '@/dtos/book-dto'
import { getRecommendBooksService } from '@/services/getRecommendBooksService'

export type GetRecommendBooksContextDataProps = {
  recommendBooks: BooksDTO[]
  isLoadingRecommendBooks: boolean
  getRecommendBooks: () => Promise<void>
}

type GetRecommendBooksContextProviderProps = {
  children: ReactNode
}

export const GetRecommendBooksContext =
  createContext<GetRecommendBooksContextDataProps>(
    {} as GetRecommendBooksContextDataProps
  )

export function GetRecommendBooksContextProvider({
  children,
}: GetRecommendBooksContextProviderProps) {
  const [recommendBooks, setRecommendBooks] = useState<BooksDTO[]>([])
  const [isLoadingRecommendBooks, setIsLoadingRecommendBooks] = useState(true)

  async function getRecommendBooks() {
    const { token } = await storageAuthTokenGet()

    setIsLoadingRecommendBooks(true)
    if (token) {
      const { books } = await getRecommendBooksService({ token })
      setRecommendBooks(books)
    }

    setIsLoadingRecommendBooks(false)
  }

  return (
    <GetRecommendBooksContext.Provider
      value={{ recommendBooks, isLoadingRecommendBooks, getRecommendBooks }}
    >
      {children}
    </GetRecommendBooksContext.Provider>
  )
}
